import OrderDetails, { Order } from "@/components/admin/OrderDetails";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
// import { Sheet } from "./ui/sheet"; // استخدم مسار مكتبة واجهة المستخدم الصحيح لديك

interface OrderDetailsSheetProps {
  order: Order | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSaveSuccess?: (updatedOrder: Order) => void; // Callback لنجاح الحفظ
}

export function OrderDetailsSheet({
  order,
  isOpen,
  onOpenChange,
  onSaveSuccess
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

        {/* تمرير الـ order و الـ onSaveSuccess إلى OrderDetails */}
        {order && <OrderDetails order={order} onSaveSuccess={onSaveSuccess} />}

        <SheetFooter className="mt-6 flex-row-reverse sm:justify-start gap-2">
          {/* أزرار أخرى هنا إذا لزم الأمر */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}