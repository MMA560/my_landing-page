import React from "react";
import { Header } from "@/components/Header"; // تأكد من المسار الصحيح
import { Footer } from "@/components/Footer"; // تأكد من المسار الصحيح
import {
  Brush, // للتنظيف
  Tag, // للمواد
  CloudRain, // للحماية
  Settings, // تم التغيير من Shoes إلى Settings
  Lightbulb, // نصائح
  SprayCan, // منتجات عناية
  Moon, // للتخزين
  RefreshCcw, // للترميم/التجديد
} from "lucide-react";

export const CareInstructions = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="py-12" >
        <div className="container mx-auto px-4">
          {/* قسم العنوان الرئيسي */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              تعليمات العناية
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              حافظ على أحذية Rush Kicks في أفضل حالاتها باتباع إرشادات العناية التفصيلية لمختلف المواد.
            </p>
          </section>

          {/* قسم نصائح العناية العامة */}
          <section className="bg-card rounded-lg border border-border p-8 shadow-sm mb-12">
            <h2 className="text-3xl font-serif font-bold text-right mb-8 flex items-center justify-end gap-3">
              <Settings className="w-8 h-8 text-primary" /> {/* تم التغيير من Shoes إلى Settings */}
              نصائح عامة للعناية بالأحذية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
              <div className="flex flex-col items-end text-right space-y-3">
                <Brush className="w-10 h-10 text-gold mb-2" />
                <h3 className="text-xl font-semibold">التنظيف المنتظم</h3>
                <p className="text-muted-foreground">
                  نظّف أحذيتك بانتظام لإزالة الغبار والأوساخ باستخدام فرشاة ناعمة أو قطعة قماش رطبة.
                </p>
              </div>
              <div className="flex flex-col items-end text-right space-y-3">
                <Moon className="w-10 h-10 text-gold mb-2" />
                <h3 className="text-xl font-semibold">التخزين الصحيح</h3>
                <p className="text-muted-foreground">
                  قم بتخزين الأحذية في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة، ويفضل استخدام حشوات الأحذية للحفاظ على شكلها.
                </p>
              </div>
              <div className="flex flex-col items-end text-right space-y-3">
                <CloudRain className="w-10 h-10 text-gold mb-2" />
                <h3 className="text-xl font-semibold">الحماية من العوامل الجوية</h3>
                <p className="text-muted-foreground">
                  استخدم بخاخات الحماية المناسبة لنوع المادة لصد الماء والبقع.
                </p>
              </div>
            </div>
          </section>

          {/* قسم العناية حسب المادة */}
          <section className="bg-card rounded-lg border border-border p-8 shadow-sm">
            <h2 className="text-3xl font-serif font-bold text-right mb-8 flex items-center justify-end gap-3">
              <Tag className="w-8 h-8 text-primary" />
              العناية حسب المادة
            </h2>
            <div className="space-y-10">
              {/* الجلد الطبيعي */}
              <div className="text-right">
                <h3 className="text-2xl font-bold mb-4 flex items-center justify-end gap-2">
                  <Tag className="w-6 h-6 text-blue-500" />
                  الجلد الطبيعي
                </h3>
                <ul className="list-none space-y-3 text-lg text-muted-foreground">
                  <li className="flex items-start gap-2 flex-row-reverse">
                    <RefreshCcw className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>
                      نظّف السطح بقطعة قماش ناعمة ورطبة لإزالة الأوساخ.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 flex-row-reverse">
                    <SprayCan className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>
                      استخدم ملمع أحذية خاص بالجلد لتغذية الجلد واستعادة لمعانه.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 flex-row-reverse">
                    <Lightbulb className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>
                      تجنب تعريض الأحذية الجلدية لأشعة الشمس المباشرة أو الحرارة الشديدة.
                    </span>
                  </li>
                </ul>
              </div>

              {/* الشمواه والجلد المدبوغ (Nubuck) */}
              <div className="text-right">
                <h3 className="text-2xl font-bold mb-4 flex items-center justify-end gap-2">
                  <Tag className="w-6 h-6 text-blue-500" />
                  الشمواه والجلد المدبوغ (Nubuck)
                </h3>
                <ul className="list-none space-y-3 text-lg text-muted-foreground">
                  <li className="flex items-start gap-2 flex-row-reverse">
                    <Brush className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>
                      استخدم فرشاة خاصة بالشمواه لإزالة الغبار والأوساخ وتنشيط الوبر.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 flex-row-reverse">
                    <CloudRain className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>
                      استخدم بخاخ حماية خاص بالشمواه والجلد المدبوغ لصد الماء والبقع.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 flex-row-reverse">
                    <Lightbulb className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>
                      في حالة البقع، استخدم ممحاة خاصة بالشمواه أو منظفاً مخصصاً.
                    </span>
                  </li>
                </ul>
              </div>

              {/* الأقمشة والألياف الصناعية */}
              <div className="text-right">
                <h3 className="text-2xl font-bold mb-4 flex items-center justify-end gap-2">
                  <Tag className="w-6 h-6 text-blue-500" />
                  الأقمشة والألياف الصناعية
                </h3>
                <ul className="list-none space-y-3 text-lg text-muted-foreground">
                  <li className="flex items-start gap-2 flex-row-reverse">
                    <Brush className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>
                      نظّف البقع بفرشاة ناعمة ومنظف معتدل ومياه دافئة.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 flex-row-reverse">
                    <SprayCan className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>
                      تجنب وضع الأحذية في الغسالة ما لم ينصح بذلك من الشركة المصنعة.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 flex-row-reverse">
                    <Lightbulb className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                    <span>
                      دع الأحذية تجف في الهواء بعيداً عن أشعة الشمس المباشرة أو مصادر الحرارة.
                    </span>
                  </li>
                </ul>
              </div>

              {/* ... أضف أقسام أخرى للمواد (مثل المطاط، الكتان، إلخ) إذا لزم الأمر */}
            </div>
          </section>

          {/* قسم دعوة لاتخاذ إجراء (اختياري لمنتجات العناية) */}
          {/*
          <section className="py-16 text-center" dir="rtl">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                تحتاج إلى منتجات العناية؟
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                استعرض مجموعتنا المختارة من منتجات العناية بالأحذية لضمان أفضل حماية لأحذيتك.
              </p>
              <Button
                size="lg"
                className="bg-gold hover:bg-gold/90 text-white text-lg"
                onClick={() => window.location.href = "/care-products"} // استبدل بمسار صفحة منتجات العناية
              >
                تسوق منتجات العناية
              </Button>
            </div>
          </section>
          */}
        </div>
      </main>

      <Footer />
    </div>
  );
};