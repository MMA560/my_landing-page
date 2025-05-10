
import { Order } from "@/types/order";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import OrderForm from "@/components/admin/OrderForm";

interface OrderFormSheetProps {
  order: Order | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSuccess: () => void;
}

export function OrderFormSheet({ 
  order, 
  isOpen, 
  onOpenChange, 
  onSuccess 
}: OrderFormSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl" side="right" dir="rtl">
        <SheetHeader>
          <SheetTitle>
            {order ? `تعديل الطلب #${order.id}` : "إضافة طلب جديد"}
          </SheetTitle>
          <SheetDescription>
            {order ? "قم بتعديل بيانات الطلب" : "قم بإدخال بيانات الطلب الجديد"}
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <OrderForm
            order={order}
            onSuccess={onSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
