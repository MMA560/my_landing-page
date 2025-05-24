// src/pages/ThankYou.tsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Package, Clock, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderData {
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

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fullName = location.state?.customerName || "عميلنا العزيز";
  const customerName = fullName.split(" ")[0]; // استخراج الاسم الأول فقط
  const orderId = location.state?.orderId;
  const orderData: OrderData | undefined = location.state?.orderData;

  useEffect(() => {
    // إعادة تعيين موضع التمرير إلى أعلى الصفحة فور تحميلها
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // للحصول على انتقال سلس
    });

    // Timer للعودة للصفحة الرئيسية
    const timer = setTimeout(() => {
      navigate("/");
    }, 15000); // 15 ثانية

    return () => clearTimeout(timer);
  }, [navigate]);

  // useEffect إضافي للتأكد من إعادة التعيين عند أي تغيير في الموقع
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div
      className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-16"
      dir="rtl"
    >
      <div className="bg-card border border-border rounded-2xl p-10 text-center shadow-xl max-w-lg w-full animate-fade-in">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />

        <h1 className="text-3xl font-bold mb-4">شكرًا {customerName}!</h1>

        {orderId && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Package className="w-6 h-6 text-green-600" />
              <span className="text-lg font-bold text-green-800">
                رقم طلبك: #{orderId}
              </span>
            </div>
            <p className="text-sm text-green-700">
              احتفظ بهذا الرقم للمراجعة والاستعلام
            </p>
          </div>
        )}

        <p className="text-muted-foreground text-lg mb-6">
          تم استلام طلبك بنجاح وسنتواصل معك قريبًا لتأكيد الطلب.
        </p>

        {orderData && (
          <div className="bg-secondary/50 rounded-lg p-4 mb-6 text-sm">
            <h3 className="font-semibold mb-3 text-base">ملخص طلبك:</h3>
            <div className="space-y-2 text-right">
              <div className="flex justify-between">
                <span>المنتج:</span>
                <span className="font-medium">{orderData.product}</span>
              </div>
              <div className="flex justify-between">
                <span>اللون:</span>
                <span className="font-medium">{orderData.color}</span>
              </div>
              <div className="flex justify-between">
                <span>المقاس:</span>
                <span className="font-medium">{orderData.size}</span>
              </div>
              <div className="flex justify-between">
                <span>الكمية:</span>
                <span className="font-medium">{orderData.quantity}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">المجموع الكلي:</span>
                <span className="font-bold">{orderData.total_cost} جنيه</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">خطوات تالية</span>
          </div>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• سنتصل بك خلال 24 ساعة لتأكيد الطلب</li>
            <li>• يتم الشحن خلال 2-5 أيام عمل</li>
            <li>• ستتلقى رقم التتبع عند الشحن</li>
          </ul>
        </div>

        <div className="flex items-center justify-center gap-2 mb-4 text-sm text-muted-foreground">
          <Phone className="w-4 h-4" />
          <span>للاستفسار: اتصل بنا أو راسلنا واتساب</span>
          <div>+201033156757</div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          سيتم تحويلك تلقائيًا خلال ثوانٍ...
        </p>

        <Button
          className="bg-gold hover:bg-gold/90 text-white w-full"
          onClick={() => {
            // التأكد من إعادة تعيين موضع التمرير قبل الانتقال
            window.scrollTo(0, 0);
            navigate("/");
          }}
        >
          العودة للصفحة الرئيسية
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;