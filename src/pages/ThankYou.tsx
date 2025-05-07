// src/pages/ThankYou.tsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThankYou = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fullName = location.state?.customerName || "عميلنا العزيز";
  const customerName = fullName.split(" ")[0]; // استخراج الاسم الأول فقط

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-16">
      <div className="bg-card border border-border rounded-2xl p-10 text-center shadow-xl max-w-md w-full animate-fade-in">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">شكرًا {customerName}!</h1>
        <p className="text-muted-foreground text-lg mb-6">
          تم استلام طلبك بنجاح وسنتواصل معك قريبًا لتأكيد الطلب.
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          سيتم تحويلك تلقائيًا خلال ثوانٍ...
        </p>
        <Button className="bg-gold hover:bg-gold/90 text-white" onClick={() => navigate("/")}>
          العودة للصفحة الرئيسية
        </Button>
      </div>
    </div>
  );
};

export default ThankYou;
