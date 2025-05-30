import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@/config/Config";
import { RefreshCcwDot } from "lucide-react";
import { FrontendProductInventory } from "@/types/product";
import { api } from "@/services/api"; // Import API for inventory update

type OrderFormProps = {
  productName: string;
  productId: number;
  unitPrice: number;
  selectedSize: string | null;
  selectedColor: string | null;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  availableStock: number;
  inventory: FrontendProductInventory;
  inventoryIds?: Record<string, Record<string, number>>; // Added inventoryIds prop to access product_inventory_id
  availableColors?: Array<{ value: string; label: string; image: string }>;
};

// تعريف نوع البيانات المتوقعة من الخادم
interface OrderResponse {
  order_id: number;
  name: string;
  phone: string;
  second_phone?: string;
  address: string;
  city?: string;
  state?: string;
  notes?: string;
  product: string;
  color: string;
  size: string;
  quantity: number;
  shipping: string;
  total_cost: number;
  status: string;
  created_at: string;
  updated_at: string;
  is_read: boolean;
  email?: string;
  image_url?: string;
}

export const OrderForm: React.FC<OrderFormProps> = ({
  productName,
  productId,
  unitPrice,
  selectedSize,
  selectedColor,
  quantity,
  setQuantity,
  availableStock,
  inventoryIds,
  availableColors = [],
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
  const [currentInventoryItemId, setCurrentInventoryItemId] = useState<
    number | undefined
  >(undefined);

  // تحديث معرف العنصر في المخزون عندما يتغير اللون أو المقاس
  useEffect(() => {
    if (selectedColor && selectedSize && inventoryIds) {
      const itemId = inventoryIds[selectedColor]?.[selectedSize];
      setCurrentInventoryItemId(itemId);
      console.log(
        `تم تحديث معرف العنصر في المخزون: ${itemId} للون: ${selectedColor} والمقاس: ${selectedSize}`
      );
    } else {
      setCurrentInventoryItemId(undefined);
      console.log("لم يتم العثور علي معرفات المتغيرات: ", inventoryIds);
    }
  }, [selectedColor, selectedSize, inventoryIds]);

  const shippingCost = 60; // تكلفة الشحن

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      if (value > availableStock) {
        toast({
          title: "كمية غير متاحة",
          description: `لا يمكنك طلب أكثر من ${availableStock} قطعة لهذا المقاس واللون.`,
          variant: "destructive",
        });
        setQuantity(availableStock > 0 ? availableStock : 1); // Cap at available stock or set to 1 if 0
      } else {
        setQuantity(value);
      }
    } else if (value === 0) {
      setQuantity(1); // Prevent quantity from being 0
    }
  };

  const handleIncrement = () => {
    if (quantity < availableStock) {
      // Only increment if stock allows
      setQuantity((prev) => prev + 1);
    } else {
      toast({
        title: "كمية غير متاحة",
        description: `وصلت للحد الأقصى المتاح من المخزون: ${availableStock} قطعة.`,
        variant: "destructive",
      });
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSize || !selectedColor) {
      toast({
        title: "يرجى إكمال اختيارك",
        description: "يرجى اختيار المقاس واللون قبل تقديم الطلب.",
        variant: "destructive",
      });
      return;
    }

    // --- STOCK CHECK ON SUBMISSION (CRUCIAL) ---
    if (availableStock === 0 || quantity > availableStock) {
      toast({
        title: "عذراً، المنتج غير متاح حالياً",
        description:
          "الكمية المطلوبة غير متوفرة لهذا المقاس واللون. يرجى مراجعة الخيارات المتاحة.",
        variant: "destructive",
      });
      setSubmitting(false); // Ensure button is not stuck
      return;
    }
    // --- END STOCK CHECK ---

    setSubmitting(true);

    // تحقق من وجود معرف العنصر في المخزون
    if (!currentInventoryItemId) {
      console.error(
        "لا يمكن العثور على معرف العنصر في المخزون للتركيبة المختارة",
        { selectedColor, selectedSize }
      );
      toast({
        title: "مشكلة في المخزون",
        description:
          "لا يمكن العثور على معرف العنصر في المخزون للتركيبة المختارة. يرجى المحاولة لاحقًا.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    if (form.current) {
      const customerName = formData.name || "عميلنا العزيز";

      try {
        // Step 1: Create the order
        const response = await fetch(
          `${BASE_URL}/order-app/api/v1/create-order/?to_email=mo3geza380@gmail.com`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              phone: formData.phone,
              second_phone: formData.second_phone,
              address: formData.address,
              city: formData.city,
              state: formData.governate,
              notes: formData.notes,
              product: productName,
              product_id: productId,
              color: selectedColor,
              size: selectedSize,
              shipping: shippingCost,
              total_cost: totalWithShipping,
              quantity: quantity,
              inventory_item_id: currentInventoryItemId, // استخدام متغير الحالة الذي تم تحديثه
            }),
          }
        );

        if (response.ok) {
          // الحصول على بيانات الطلب من الاستجابة
          const orderData: OrderResponse = await response.json();

          // Step 1: تحديد القيم المطلوبة للتتبع
          const purchaseValue = totalWithShipping; // القيمة الكلية للطلب بعد الشحن
          const purchaseCurrency = "EGP"; // العملة (يمكن تعديلها لاحقًا حسب الموقع)

          const purchasedItems = [
            {
              item_id: productId ? String(productId) : undefined, // معرف المنتج بصيغة نص
              quantity: quantity,
              price: unitPrice,
              item_name: productName,
              item_variant: `${selectedColor || ""}-${
                selectedSize || ""
              }`.trim(),
            },
          ];

          // ✅ تتبع الشراء باستخدام Facebook Pixel
          console.log("Before FB Pixel Track");
          fbq("track", "Purchase", {
            value: purchaseValue,
            currency: purchaseCurrency,
            contents: purchasedItems,
            content_type: "product",
            num_items: quantity,
          });
          console.log("After FB Pixel Track");

          // ✅ تتبع الشراء باستخدام Google Analytics 4 (GA4)
          console.log("Before GA4 Track");
          gtag("event", "purchase", {
            currency: purchaseCurrency,
            value: purchaseValue,
            items: purchasedItems,
          });
          console.log("After GA4 Track");

          // Step 2: تحديث المخزون بعد تأكيد الطلب
          console.log(
            "Updating inventory with ID:",
            currentInventoryItemId,
            "Quantity:",
            quantity
          );
          try {
            await api.updateInventoryItemQuantity(
              currentInventoryItemId,
              quantity
            );
            console.log(
              `✅ تم تحديث المخزون بنجاح للعنصر #${currentInventoryItemId} بكمية ${quantity}`
            );
          } catch (inventoryError) {
            console.error("❌ فشل في تحديث المخزون:", inventoryError);
            // يمكن لاحقًا إرسال إشعار للمسؤول هنا
          }

          // Step 3: إعلام المستخدم بنجاح الطلب
          //toast({
           // title: "تم تقديم الطلب بنجاح!",
            //description: `تم إرسال طلبك برقم ${orderData.order_id} بنجاح. سنتواصل معك قريبًا لتأكيد تفاصيل طلبك.`,
          //});

          // Step 4: إعادة توجيه المستخدم لصفحة الشكر مع رقم الطلب
          console.log("================================================");
          console.log("Order ID: ", orderData);
          console.log("================================================");
          navigate("/thank-you", {
            state: {
              customerName: customerName,
              orderId: orderData.order_id,
              orderData: orderData,
            },
          });
        } else {
          const errorData = await response.json();
          toast({
            title: "حدث خطأ أثناء إرسال الطلب",
            description:
              errorData.detail ||
              errorData.message ||
              "لم نتمكن من إرسال الطلب في الوقت الحالي. يرجى المحاولة لاحقًا.",
            variant: "destructive",
          });
        }
      } catch (error) {
        toast({
          title: "حدث خطأ غير متوقع",
          description: "لم نتمكن من الاتصال بالخادم. يرجى المحاولة لاحقًا.",
          variant: "destructive",
        });
      } finally {
        setSubmitting(false);
      }
    }
  };

  const totalPrice = unitPrice * quantity;
  const totalWithShipping = totalPrice + shippingCost;

  // الحصول على معلومات اللون المختار لعرضه في ملخص الطلب
  const selectedColorInfo = availableColors.find(
    (color) => color.value === selectedColor
  );
  const colorDisplayName = selectedColorInfo?.label || selectedColor;
  const colorImage = selectedColorInfo?.image;

  return (
    <form
      ref={form}
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
            placeholder="01x xxxxxxxx - يًفضّل عليه واتساب"
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
            placeholder="01x xxxxxxxx (اختياري)"
            value={formData.second_phone}
            onChange={handleChange}
          />
        </div>

        {/*
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
        */}
        <div className="space-y-2">
          <Label htmlFor="address">عنوان الشحن بالتفصيل</Label>
          <Input
            dir="rtl"
            id="address"
            name="address"
            placeholder="اسم الشارع - المدينة - المحافظة + علامة مميزة"
            value={formData.address}
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
              disabled={quantity <= 1}
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
              disabled={quantity >= availableStock}
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
              <li className="flex justify-between items-center">
                <span>اللون:</span>
                <div className="flex items-center gap-2">
                  {colorImage && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-300">
                      <img
                        src={colorImage}
                        alt={colorDisplayName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <span className="font-medium">{colorDisplayName}</span>
                </div>
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
            <li className="flex justify-between font-bold text-lg">
              <span>المجموع الكلي:</span>
              <span className="font-medium">{totalWithShipping} جنيه</span>
            </li>
            <li className="flex justify-between">
              <span>سعر الوحدة:</span>
              <span className="font-medium">{unitPrice.toFixed(2)} جنيه</span>
            </li>
          </ul>
          {/* Add hidden inputs for backend */}
          <Input type="hidden" name="product_name" value={productName} />
          <Input type="hidden" name="product_id" value={productId} />
          <Input
            type="hidden"
            name="selected_size"
            value={selectedSize || ""}
          />
          <Input
            type="hidden"
            name="selected_color"
            value={selectedColor || ""}
          />
          <Input type="hidden" name="quantity" value={quantity} />
          <Input type="hidden" name="shipping_cost" value={shippingCost} />
          <Input
            type="hidden"
            name="total_with_shipping"
            value={totalWithShipping.toFixed(2)}
          />
          {currentInventoryItemId && (
            <Input
              type="hidden"
              name="inventory_item_id"
              value={currentInventoryItemId}
            />
          )}
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <p className="m-0">بتقديم الطلب انت توافق علي</p>
          <a
            href="/policies"
            className="underline hover:text-foreground transition-colors"
          >
            سياسات الشحن والاستبدال والاسترجاع
          </a>
        </div>

        <Button
          type="submit"
          className="w-full mt-4 bg-gold hover:bg-gold/90 text-white"
          disabled={
            submitting ||
            !selectedSize ||
            !selectedColor ||
            quantity <= 0 ||
            availableStock === 0 ||
            quantity > availableStock
          }
        >
          {submitting ? (
            <span className="flex items-center justify-center">
              {" "}
              جاري الإرسال
              <RefreshCcwDot className="animate-spin mr-2" size={18} />{" "}
            </span>
          ) : (
            "تقديم الطلب"
          )}
        </Button>
      </div>
    </form>
  );
};
