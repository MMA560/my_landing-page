import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type OrderFormProps = {
  productName: string;
  selectedSize: string | null;
  selectedColor: string | null;
  quantity: number; // إضافة quantity إلى props
};

export const OrderForm: React.FC<OrderFormProps> = ({
  productName,
  selectedSize,
  selectedColor,
  quantity, // إضافة quantity إلى المكونات
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    notes: "",
  });
  const [currentQuantity, setCurrentQuantity] = useState(quantity); // استخدام الكمية المبدئية
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setCurrentQuantity(value);
    }
  };

  const handleIncrement = () => {
    setCurrentQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (currentQuantity > 1) {
      setCurrentQuantity((prev) => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSize || !selectedColor) {
      toast({
        title: "يرجى إكمال اختيارك",
        description: "يرجى اختيار المقاس واللون قبل تقديم الطلب.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    // محاكاة تقديم الطلب
    setTimeout(() => {
      toast({
        title: "تم تقديم الطلب بنجاح!",
        description: "سنتواصل معك قريبًا لتأكيد تفاصيل طلبك.",
      });
      setSubmitting(false);
    }, 1500);
  };

  const unitPrice = 295.0; // سعر الوحدة
  const totalPrice = unitPrice * currentQuantity; // حساب المجموع بناءً على الكمية

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl mx-auto"
      dir="rtl"
    >
      <h3 className="text-xl font-serif">أكمل طلبك</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">الاسم الكامل</Label>
          <Input
            id="name"
            name="name"
            placeholder="أدخل اسمك"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">رقم الهاتف</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">عنوان الشحن</Label>
          <Input
            dir="rtl"
            id="address"
            name="address"
            placeholder="123 شارع  مصطفي كامل ، شقة 4"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">المدينة</Label>
          <Input
            id="city"
            name="city"
            placeholder="القاهرة، مصر"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">ملاحظات الطلب (اختياري)</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="أي تعليمات خاصة بطلبك..."
            value={formData.notes}
            onChange={handleChange}
            className="resize-none"
            rows={3}
          />
        </div>

        <div className="mb-8 text-right" dir="rtl">
          <Label htmlFor="quantity" className="font-medium text-lg block mb-3">
            العدد
          </Label>
          <div className="flex items-center justify-start gap-2">
            <Button
              onClick={handleDecrement}
              className="px-6 py-3 text-xl rounded-lg border border-gray-400 bg-background hover:bg-background/80 text-foreground transition-all duration-200"
            >
              -
            </Button>
            <Input
              id="quantity"
              type="number"
              min={1}
              value={currentQuantity}
              onChange={handleQuantityChange}
              className="w-24 text-center border-none"
              disabled
            />
            <Button
              onClick={handleIncrement}
              className="px-6 py-3 text-xl rounded-lg border border-gray-400 bg-background hover:bg-background/80 text-foreground transition-all duration-200"
            >
              +
            </Button>
          </div>
        </div>

        <div className="bg-secondary/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">ملخص الطلب</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-between">
              <span>المنتج:</span>
              <span className="font-medium">{productName}</span>
            </li>
            {selectedSize && (
              <li className="flex justify-between">
                <span>المقاس:</span>
                <span className="font-medium">US {selectedSize}</span>
              </li>
            )}
            {selectedColor && (
              <li className="flex justify-between">
                <span>اللون:</span>
                <span className="font-medium capitalize">{selectedColor}</span>
              </li>
            )}
            <li className="flex justify-between">
              <span>العدد:</span>
              <span className="font-medium">{currentQuantity}</span>
            </li>
            <li className="flex justify-between pt-2 border-t border-border mt-2">
              <span>المجموع:</span>
              <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </li>
          </ul>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gold hover:bg-gold/90 text-white"
        disabled = {submitting}
      >
        {submitting ? "جارٍ المعالجة..." : "أكمل الطلب"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        عند تقديمك لهذا الطلب، فإنك توافق على{" "}
        <a href="#" className="underline">
          شروط الخدمة
        </a>{" "}
        و{" "}
        <a href="#" className="underline">
          سياسة الخصوصية
        </a>
        .
      </p>
    </form>
  );
};
