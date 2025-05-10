// src/pages/admin/OrdersManagement.tsx

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/services/api";
import { Order, OrderStatus, orderStatusArabic } from "@/types/order";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RefreshCw, Plus } from "lucide-react";
import { OrdersFilter } from "@/components/admin/orders/OrdersFilter";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { OrderDetailsSheet } from "@/components/admin/orders/OrderDetailsSheet";
import { DeleteOrderDialog } from "@/components/admin/orders/DeleteOrderDialog";

export default function OrdersManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [isReadFilter, setIsReadFilter] = useState<"all" | "unread" | "read">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch orders (جلب الطلبات)
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: api.getAllOrders,
  });

  // Delete order mutation (طفرة حذف الطلب)
  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast({
        title: "تم حذف الطلب بنجاح",
        description: "تم حذف بيانات الطلب من قاعدة البيانات",
      });
      setIsDeleteConfirmOpen(false);
    },
    onError: () => {
      toast({
        title: "حدث خطأ",
        description: "لم يتم حذف الطلب، حاول مرة أخرى",
        variant: "destructive",
      });
    },
  });

  // Update order status mutation (طفرة تحديث حالة الطلب)
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: OrderStatus }) =>
      api.updateOrder(id, { status }),
    onSuccess: (updatedOrder) => {
      if (!updatedOrder) return;
      
      // تحديث قائمة الطلبات مباشرة بعد نجاح تحديث الحالة
      queryClient.setQueryData(["orders"], (oldData: Order[] | undefined) => {
        if (!oldData) return [];
        return oldData.map(order => 
          order.order_id === updatedOrder.order_id ? { ...order, ...updatedOrder } : order
        );
      });
      
      // إعادة جلب الطلبات لضمان التحديث الكامل
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      
      toast({
        title: "تم تحديث حالة الطلب",
        description: `تم تغيير حالة الطلب رقم ${updatedOrder.order_id} إلى ${orderStatusArabic[updatedOrder.status as OrderStatus]}`,
      });
      
      // تعليم الطلب كمقروء بعد تحديث الحالة
      if (!updatedOrder.is_read) {
        handleMarkAsRead(updatedOrder.order_id);
      }
    },
    onError: () => {
      toast({
        title: "حدث خطأ",
        description: "لم يتم تحديث حالة الطلب، حاول مرة أخرى",
        variant: "destructive",
      });
    },
  });

  // Update order read status mutation (طفرة تحديث حالة القراءة)
  const markAsReadMutation = useMutation({
    mutationFn: (orderId: number) => api.markOrderAsRead(orderId),
    onSuccess: (updatedOrder) => {
      if (!updatedOrder) return;
      
      // تحديث قائمة الطلبات مباشرة بعد نجاح تعليم الطلب كمقروء
      queryClient.setQueryData(["orders"], (oldData: Order[] | undefined) => {
        if (!oldData) return [];
        return oldData.map(order => 
          order.order_id === updatedOrder.order_id ? { ...order, is_read: true } : order
        );
      });
    },
    onError: (error) => {
      console.error("فشل في تحديث حالة القراءة للطلب:", error);
      toast({
        title: "تنبيه",
        description: "لم يتم تحديث حالة قراءة الطلب، لكن العملية الأساسية نجحت",
        variant: "default",
      });
    },
  });

  // Filtered orders (الطلبات المفلترة)
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      (order.name?.toLowerCase().includes(searchTerm.toLowerCase()) || "") ||
      (order.phone?.includes(searchTerm) || "") ||
      (order.order_id?.toString()?.includes(searchTerm) || "");

    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
      
    const matchesReadStatus =
      isReadFilter === "all" || 
      (isReadFilter === "unread" && !order.is_read) ||
      (isReadFilter === "read" && order.is_read);

    return matchesSearch && matchesStatus && matchesReadStatus;
  });

  // Handle refresh (معالجة التحديث)
  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    toast({
      title: "تحديث البيانات",
      description: "تم تحديث قائمة الطلبات",
    });
  };

  // دالة مساعدة لتعليم الطلب كمقروء
  const handleMarkAsRead = async (orderId: number): Promise<void> => {
    try {
      await markAsReadMutation.mutateAsync(orderId);
    } catch (error) {
      console.error("فشل في تعليم الطلب كمقروء:", error);
      // لا نقوم بإظهار إشعار هنا، لأن الخطأ في تعليم الطلب كمقروء لا يجب أن يعطل العملية الأساسية
    }
  };

  // Open order details (فتح تفاصيل الطلب)
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
    
    // إذا لم يكن الطلب مقروءًا بالفعل، قم بتعليمه كمقروء
    // (سيتم استدعاء هذه الدالة من OrdersTable أيضًا عند الضغط على زر العين)
    if (!order.is_read) {
      handleMarkAsRead(order.order_id);
    }
  };

  // Handle status change (معالجة تغيير الحالة)
  const handleStatusChange = async (id: number, status: OrderStatus): Promise<void> => {
    try {
      toast({
        title: "جاري تحديث الحالة",
        description: `جاري تغيير حالة الطلب رقم ${id} إلى ${orderStatusArabic[status]}`,
      });
      
      await updateStatusMutation.mutateAsync({ id, status });
    } catch (error) {
      console.error("فشل في تحديث حالة الطلب:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في تحديث حالة الطلب، يرجى المحاولة مرة أخرى",
      });
    }
  };

  // Open edit form (فتح نموذج التعديل)
  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setIsFormOpen(true);
    
    // تعليم الطلب كمقروء عند التعديل
    if (!order.is_read) {
      handleMarkAsRead(order.order_id);
    }
  };

  // Open delete confirmation (فتح تأكيد الحذف)
  const handleDeleteConfirm = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteConfirmOpen(true);
    
    // تعليم الطلب كمقروء عند محاولة الحذف
    if (!order.is_read) {
      handleMarkAsRead(order.order_id);
    }
  };

  // Handle delete (معالجة الحذف)
  const handleDelete = () => {
    if (selectedOrder) {
      deleteMutation.mutate(selectedOrder.order_id);
    }
  };

  // New order (طلب جديد)
  const handleNewOrder = () => {
    setSelectedOrder(null);
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold">إدارة الطلبات</h1>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            <span className="sr-only">تحديث</span>
          </Button>

          <Button onClick={handleNewOrder} className="gap-1">
            <Plus className="h-4 w-4" />
            <span>طلب جديد</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Search and filters (البحث والفلاتر) */}
        <OrdersFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          isReadFilter={isReadFilter}
          setIsReadFilter={setIsReadFilter}
        />

        {/* Orders Table (جدول الطلبات) */}
        <OrdersTable
          orders={filteredOrders}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
          onEdit={handleEdit}
          onDeleteConfirm={handleDeleteConfirm}
          onStatusChange={handleStatusChange}
          onMarkAsRead={handleMarkAsRead} // تمرير الدالة الجديدة لتعليم الطلب كمقروء
        />
      </div>

      {/* Order Details Sheet (لوحة تفاصيل الطلب) */}
      <OrderDetailsSheet
        order={selectedOrder}
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onSuccess={(updatedOrder) => {
          // تحديث قائمة الطلبات مباشرة بعد إغلاق نافذة التفاصيل
          if (updatedOrder) {
            queryClient.setQueryData(["orders"], (oldData: Order[] | undefined) => {
              if (!oldData) return [];
              return oldData.map(order => 
                order.order_id === updatedOrder.order_id ? { ...order, ...updatedOrder } : order
              );
            });
          }
        }}
      />

      

      {/* Delete Confirmation Dialog (حوار تأكيد الحذف) */}
      <DeleteOrderDialog
        order={selectedOrder}
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        onDeleted={handleDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}