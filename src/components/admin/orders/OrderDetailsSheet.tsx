import OrderDetails from "@/components/admin/OrderDetails"; // تم استيراد OrderDetails فقط
import { Order } from "@/types/order"; // تم استيراد Order من ملف الأنواع الصحيح الخاص بها
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
// import { Sheet } from "./ui/sheet"; // استخدام مسار مكتبة واجهة المستخدم الصحيح لديك

interface OrderDetailsSheetProps {
  order: Order | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess?: (updatedOrder: Order) => void; // تم التغيير هنا: من onSaveSuccess إلى onSuccess
}

export function OrderDetailsSheet({
  order,
  isOpen,
  onOpenChange,
  onSuccess // تم التغيير هنا أيضاً: من onSaveSuccess إلى onSuccess
}: OrderDetailsSheetProps) {

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-xl overflow-y-auto" side="right" dir="rtl">
        <SheetHeader>
          <SheetTitle>تفاصيل الطلب #{order?.order_id}</SheetTitle>
          <SheetDescription>
            عرض كامل بيانات وتفاصيل الطلب
          </SheetDescription>
        </SheetHeader>

        {/* تمرير الـ order و الـ onSuccess (التي تم تغيير اسمها في هذا المكون) إلى OrderDetails
            كميزة onSaveSuccess (لأن OrderDetails يتوقعها بهذا الاسم) */}
        {order && <OrderDetails order={order} onSaveSuccess={onSuccess} />}

        <SheetFooter className="mt-6 flex-row-reverse sm:justify-start gap-2">
          {/* أزرار أخرى هنا إذا لزم الأمر */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}