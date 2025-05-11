// src/components/admin/orders/OrdersTable.tsx

import { useState } from "react";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import {
  Eye,
  Trash2,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order, OrderStatus, orderStatusArabic, orderStatusColors } from "@/types/order";

interface OrdersTableProps {
  orders: Order[];
  isLoading: boolean;
  onViewDetails: (order: Order) => void;
  onEdit: (order: Order) => void; // دالة للتعديل يتم تمريرها من المكون الأب (إذا كان هناك زر تعديل مباشر هنا)
  onDeleteConfirm: (order: Order) => void;
  onStatusChange: (orderId: number, newStatus: OrderStatus) => Promise<void>;
  onMarkAsRead: (orderId: number) => Promise<void>;
}

export function OrdersTable({
  orders,
  isLoading,
  onViewDetails,
  onEdit, // onEdit prop is available if needed for a direct edit button
  onDeleteConfirm,
  onStatusChange,
  onMarkAsRead,
}: OrdersTableProps) {
  const [updatingStatus, setUpdatingStatus] = useState<number | null>(null);

  const handleStatusChangeInternal = async (orderId: number, newStatus: OrderStatus) => {
    try {
      setUpdatingStatus(orderId);
      await onStatusChange(orderId, newStatus);
    } catch (error) {
      console.error("فشل في تحديث حالة الطلب محليًا:", error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleViewDetailsClick = async (order: Order) => {
    try {
      if (!order.is_read) {
        await onMarkAsRead(order.order_id);
      }
      onViewDetails(order);
    } catch (error) {
      console.error("فشل في تعليم الطلب كمقروء عند عرض التفاصيل:", error);
      onViewDetails(order); // نعرض التفاصيل على أي حال
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return format(new Date(dateStr), "d MMM. yyyy", { locale: arSA });
    } catch {
      return dateStr;
    }
  };

  const formatCurrency = (value: number | string) => {
    const numberValue =
      typeof value === "string" ? parseFloat(value) : value;
    return `${numberValue.toLocaleString("ar-EG")} ج.م`;
  };

  return (
    <>
      <Card className="md:col-span-12 overflow-hidden">
        <CardHeader className="p-4">
          <CardTitle className="text-lg">
            قائمة الطلبات ({orders.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>رقم الطلب</TableHead>
                  <TableHead>اسم العميل</TableHead>
                  <TableHead>الهاتف</TableHead>
                  <TableHead>المحافظة</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>التكلفة</TableHead>
                  <TableHead>عدد القطع</TableHead> {/* <---  العمود الجديد  ---> */}
                  <TableHead>تاريخ الإنشاء</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center h-24"> {/* <--- تعديل colSpan إلى 9 ---> */}
                      {isLoading ? "جاري تحميل البيانات..." : "لا توجد طلبات"}
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow
                      key={order.order_id}
                      className={order.is_read ? "" : "bg-green-50/20"}
                    >
                      <TableCell className="font-medium">#{order.order_id}</TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell dir="ltr" className="text-right">
                        {order.phone}
                      </TableCell>
                      <TableCell>{order.state}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className={`${
                                orderStatusColors[order.status as OrderStatus] || "bg-gray-100 text-gray-800"
                              } text-xs h-7 rounded-full gap-1`}
                              disabled={updatingStatus === order.order_id}
                            >
                              {updatingStatus === order.order_id ? (
                                "جاري التحديث..."
                              ) : (
                                <>
                                  {orderStatusArabic[order.status as OrderStatus] || order.status}
                                  <ChevronDown className="h-3 w-3" />
                                </>
                              )}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleStatusChangeInternal(order.order_id, "pending")}
                              disabled={order.status === "pending" || updatingStatus !== null}
                            >
                              قيد الانتظار
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChangeInternal(order.order_id, "confirmed")}
                              disabled={order.status === "confirmed" || updatingStatus !== null}
                            >
                              تم التأكيد
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChangeInternal(order.order_id, "delivering")}
                              disabled={order.status === "delivering" || updatingStatus !== null}
                            >
                              قيد التسليم
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChangeInternal(order.order_id, "delivered")}
                              disabled={order.status === "delivered" || updatingStatus !== null}
                            >
                              تم التسليم
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChangeInternal(order.order_id, "canceled")}
                              disabled={order.status === "canceled" || updatingStatus !== null}
                              className="text-red-600"
                            >
                              ملغي
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell>{formatCurrency(order.total_cost)}</TableCell>
                      <TableCell>{order.quantity}</TableCell> {/* <--- عرض عدد القطع ---> */}
                      <TableCell>{formatDate(order.created_at)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8"
                            onClick={() => handleViewDetailsClick(order)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => onDeleteConfirm(order)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}