import { useState } from "react"; // لم يعد ضرورياً بعد الآن إذا أزلنا isDeleting الداخلية
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Order } from "@/types/order"; // تأكد أن هذا المسار صحيح
import { BASE_URL } from "@/config/Config";

interface DeleteOrderDialogProps {
  order: Order | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDeleted: () => void; // callback بعد الحذف
  isDeleting: boolean; // تم إضافة هذه الخاصية
}

export function DeleteOrderDialog({
  order,
  isOpen,
  onOpenChange,
  onDeleted,
  isDeleting, // تم إزالة isDeleting من هنا لأنه سيتم تمريره كـ prop
}: DeleteOrderDialogProps) {
  // تمت إزالة هذا السطر:
  // const [isDeleting, setIsDeleting] = useState(false);
  // الآن isDeleting تأتي كخاصية (prop) من المكون الأب

  const handleDelete = async () => {
    if (!order) return;
    console.log("order passed to dialog:", order);
    // تمت إزالة هذا السطر: setIsDeleting(true);
    try {
      const response = await fetch(`${BASE_URL}/order-app/api/v1/orders/${order.order_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        console.log("تم حذف الطلب بنجاح:", data);
        onDeleted(); // عملية بعد الحذف (مثلاً: تحديث القائمة)
        onOpenChange(false); // إغلاق الحوار
      } else {
        const data = await response.json();
        console.error("خطأ أثناء الحذف:", data);
        alert(data.detail || "حدث خطأ أثناء حذف الطلب");
      }
    } catch (error) {
      console.error("تعذر الاتصال بالخادم:", error);
      alert("تعذر الاتصال بالخادم");
    } finally {
      // تمت إزالة هذا السطر: setIsDeleting(false);
      // حالة isDeleting يديرها المكون الأب
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
            disabled={isDeleting} // استخدام خاصية isDeleting الممرة من الأب
          >
            {isDeleting ? "جاري الحذف..." : "حذف الطلب"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}