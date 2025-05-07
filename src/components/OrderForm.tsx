import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

type OrderFormProps = {
  productName: string;
  selectedSize: string | null;
  selectedColor: string | null;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export const OrderForm: React.FC<OrderFormProps> = ({
  productName,
  selectedSize,
  selectedColor,
  quantity,
  setQuantity,
}) => {
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    second_phone: "",
    address: "",
    city: "",
    governate: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const shippingCost = 50; // تكلفة الشحن

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
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
  
    if (form.current) {
      const customerName = formData.name|| "عميلنا العزيز"; // تأكد أن name="customer_name" موجود في الفورم
  
      emailjs
        .sendForm(
          "service_ud3sq9q", // معرف الخدمة
          "template_slive9l", // معرف القالب
          form.current,
          {
            publicKey: "Ax15POzP7S7MfbU9E", // المفتاح العام من EmailJS
          }
        )
        .then(
          () => {
            toast({
              title: "تم تقديم الطلب بنجاح!",
              description: "سنتواصل معك قريبًا لتأكيد تفاصيل طلبك.",
            });
            navigate("/thank-you", {
              state: {
                customerName: customerName,
              },
            });
          },
          (error) => {
            toast({
              title: "حدث خطأ أثناء إرسال الطلب",
              description: "لم نتمكن من إرسال الطلب في الوقت الحالي. يرجى المحاولة لاحقًا.",
              variant: "destructive",
            });
          }
        )
        .finally(() => {
          setSubmitting(false);
        });
    }
  };
  

  const unitPrice = 490.0; // سعر الوحدة
  const totalPrice = unitPrice * quantity; // حساب المجموع بناءً على الكمية
  const totalWithShipping = totalPrice + shippingCost; // المجموع الكلي مع الشحن

  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto" dir="rtl">
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
            placeholder="(555) 123-4567 - يًفضّل عليه واتساب"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="second_phone">رقم الهاتف الاحتياطي - اختياري</Label>
          <Input
            id="second_phone"
            name="second_phone"
            placeholder="(555) 789-3456 (اختياري)"
            value={formData.second_phone}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">عنوان الشحن</Label>
          <Input
            dir="rtl"
            id="address"
            name="address"
            placeholder="123 شارع مصطفى كامل، شقة 4"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="governate">المحافظة</Label>
          <Input
            id="governate"
            name="governate"
            placeholder="القاهرة"
            value={formData.governate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">المدينة</Label>
          <Input
            id="city"
            name="city"
            placeholder="مصر الجديدة"
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
              type="button"
              className="px-6 py-3 text-xl rounded-lg border border-gray-400 bg-background hover:bg-background/80 text-foreground transition-all duration-200"
            >
              -
            </Button>
            <Input
              id="quantity"
              type="number"
              min={1}
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-24 text-center border-none"
              disabled
            />
            <Button
              onClick={handleIncrement}
              type="button"
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
                <span className="font-medium">{selectedSize}</span>
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
              <span className="font-medium">{quantity}</span>
            </li>
            <li className="flex justify-between">
              <span>تكلفة الشحن:</span>
              <span className="font-medium">{shippingCost} جنيه</span>
            </li>
            <li className="flex justify-between">
              <span>المجموع الكلي:</span>
              <span className="font-medium">{totalWithShipping} جنيه</span>
            </li>
          </ul>
          <Input type="hidden" name="product_name" value={productName} />
          <Input type="hidden" name="selected_size" value={selectedSize || ""} />
          <Input type="hidden" name="selected_color" value={selectedColor || ""} />
          <Input type="hidden" name="quantity" value={quantity} />
          <Input type="hidden" name="shipping_cost" value={shippingCost} />
          <Input type="hidden" name="total_with_shipping" value={totalWithShipping.toFixed(2)} />
        </div>

        <Button type="submit" className="w-full mt-4 bg-gold hover:bg-gold/90 text-white" disabled={submitting}>
          {submitting ? "جاري الإرسال..." : "تقديم الطلب"}
        </Button>
      </div>
    </form>
  );
};