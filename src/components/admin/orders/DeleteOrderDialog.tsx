import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types/order";
import { BASE_URL } from "@/config/Config";

interface DeleteOrderDialogProps {
  order: Order | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDeleted: () => void; // callback بعد الحذف
}

export function DeleteOrderDialog({
  order,
  isOpen,
  onOpenChange,
  onDeleted,
}: DeleteOrderDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
  if (!order) return;
  console.log("order passed to dialog:", order);
  setIsDeleting(true);
  try {
    const response = await fetch(`${BASE_URL}/order-app/api/v1/orders/${order.order_id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      // في حال كان الرد صحيحاً (200 OK)
      const data = await response.json();
      console.log("تم حذف الطلب بنجاح:", data);
      onDeleted(); // عملية بعد الحذف (مثلاً: تحديث القائمة)
      onOpenChange(false); // إغلاق الحوار
    } else {
      // في حال كان الرد خطأ
      const data = await response.json();
      console.error("خطأ أثناء الحذف:", data);
      alert(data.detail || "حدث خطأ أثناء حذف الطلب");
    }
  } catch (error) {
    // في حال حدوث خطأ في الاتصال بالخادم
    console.error("تعذر الاتصال بالخادم:", error);
    alert("تعذر الاتصال بالخادم");
  } finally {
    setIsDeleting(false);
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent dir="rtl">
        <DialogHeader>
          <DialogTitle>تأكيد حذف الطلب</DialogTitle>
          <DialogDescription>
            هل أنت متأكد من حذف الطلب #{order?.order_id}؟ هذه العملية لا يمكن التراجع عنها.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "جاري الحذف..." : "حذف الطلب"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
