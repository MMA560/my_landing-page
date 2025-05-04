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
};

export const OrderForm: React.FC<OrderFormProps> = ({
  productName,
  selectedSize,
  selectedColor,
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
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSize || !selectedColor) {
      toast({
        title: "يرجى إكمال اختيارك",
        description: "يرجى اختيار الحجم واللون قبل تقديم الطلب.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "تم تقديم الطلب بنجاح!",
        description: "سنتواصل معك قريبًا لتأكيد تفاصيل طلبك.",
      });
      setSubmitting(false);
    }, 1500);
  };

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

        {/* 
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        */}

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

        <div className="bg-secondary/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">ملخص الطلب</h4>
          <ul className="space-y-1 text-sm">
            <li className="flex justify-between">
              <span>المنتج:</span>
              <span className="font-medium">{productName}</span>
            </li>
            {selectedSize && (
              <li className="flex justify-between">
                <span>الحجم:</span>
                <span className="font-medium">US {selectedSize}</span>
              </li>
            )}
            {selectedColor && (
              <li className="flex justify-between">
                <span>اللون:</span>
                <span className="font-medium capitalize">{selectedColor}</span>
              </li>
            )}
            <li className="flex justify-between pt-2 border-t border-border mt-2">
              <span>المجموع:</span>
              <span className="font-bold">$295.00</span>
            </li>
          </ul>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gold hover:bg-gold/90 text-white"
        disabled={submitting}
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
