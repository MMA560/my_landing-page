import React from "react";
import { Header } from "@/components/Header"; // تأكد من المسار الصحيح
import { Footer } from "@/components/Footer"; // تأكد من المسار الصحيح
import {
  Sparkles, // للأناقة/التميز
  Handshake, // للجودة/الثقة
  Footprints, // للراحة/التصميم
  Gem, // للتميز/المواد الفاخرة
  Target, // للرؤية/الهدف
  Lightbulb, // للابتكار
} from "lucide-react";
import { Button } from "@/components/ui/button"; // تأكد من المسار الصحيح لمكون Button

export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main>
        {/* قسم البطل (Hero Section) */}
        <section className="pt-24 pb-16 hero-gradient text-center" dir="rtl">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 animate-fade-in">
              خطوتك نحو التميز والأناقة
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-slide-up-delay">
              في **Rush Kicks**، نؤمن بأن كل خطوة هي تعبير عن شخصيتك. نصمم أحذية تجمع بين الجودة الفائقة، الراحة المطلقة، والتصميم الذي يواكب أحدث صيحات الموضة.
            </p>
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-white text-lg animate-slide-up-delay-2"
              onClick={() => window.location.href = "/"}
            >
              اكتشف منتجنا
            </Button>
          </div>
        </section>

        {/* قسم قصتنا */}
        <section className="py-16 bg-card border-t border-border" dir="rtl">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-right animate-slide-in-right">
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                  قصتنا: شغف يتحول إلى خطوات
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  بدأت **Rush Kicks** من رؤية بسيطة: توفير أحذية ليست مجرد إكسسوار، بل هي جزء لا يتجزأ من رحلة الفرد اليومية. منذ نشأتنا، التزمنا بتحدي المألوف، والبحث عن أفضل المواد، وتطبيق أحدث التقنيات لتقديم منتج يفوق التوقعات.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  كل زوج من أحذية Rush Kicks هو نتاج حرفية دقيقة واهتمام لا يتزعزع بالتفاصيل. نحن نفخر بكوننا نصنع ليس فقط أحذية، بل نجارب مشي لا تُنسى، ونضيف لمسة من الفخامة إلى كل خطوة تخطوها.
                </p>
              </div>
              <div className="flex justify-center items-center animate-slide-in-left">
                {/* صورة جذابة تتعلق بصناعة الأحذية أو تفاصيلها */}
                <img
                  src="/images/about-story.jpg" // استبدل هذا بمسار صورتك الفعلية
                  alt="قصة Rush Kicks"
                  className="rounded-lg shadow-lg w-full max-w-md h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* قسم مهمتنا ورؤيتنا وقيمنا */}
        <section className="py-16" dir="rtl">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
              مهمتنا، رؤيتنا، وقيمنا
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              {/* مهمتنا */}
              <div className="bg-card p-8 rounded-lg shadow-sm flex flex-col items-center space-y-4 animate-fade-in-delay-1">
                <Target className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-bold">مهمتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  تقديم أحذية عالية الجودة تجمع بين التصميم العصري والراحة الفائقة، لتمكين عملائنا من التعبير عن أسلوبهم بثقة في كل مناسبة.
                </p>
              </div>
              {/* رؤيتنا */}
              <div className="bg-card p-8 rounded-lg shadow-sm flex flex-col items-center space-y-4 animate-fade-in-delay-2">
                <Lightbulb className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-bold">رؤيتنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  أن نكون الخيار الأول للأحذية في المنطقة، وأن نرتقي بمعايير الأناقة والراحة من خلال الابتكار المستمر والالتزام بالتميز.
                </p>
              </div>
              {/* قيمنا */}
              <div className="bg-card p-8 rounded-lg shadow-sm flex flex-col items-center space-y-4 animate-fade-in-delay-3">
                <Sparkles className="w-12 h-12 text-primary" />
                <h3 className="text-xl font-bold">قيمنا</h3>
                <p className="text-muted-foreground leading-relaxed">
                  الجودة أولاً، راحة العميل، التصميم المبتكر، الحرفية الدقيقة، والشفافية في التعامل.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* قسم لماذا تختارنا؟ (اختياري) */}
        <section className="py-16 bg-card border-t border-border" dir="rtl">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
              لماذا تختار Rush Kicks؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center animate-zoom-in">
                <Gem className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">جودة لا تضاهى</h3>
                <p className="text-muted-foreground">
                  نستخدم أجود الخامات وأحدث تقنيات التصنيع لضمان متانة وأداء يدوم طويلاً.
                </p>
              </div>
              <div className="text-center animate-zoom-in-delay-1">
                <Footprints className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">راحة استثنائية</h3>
                <p className="text-muted-foreground">
                  تصميم هندسي يوفر أقصى درجات الراحة والدعم لقدميك طوال اليوم.
                </p>
              </div>
              <div className="text-center animate-zoom-in-delay-2">
                <Handshake className="w-12 h-12 text-gold mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">تصميم عصري</h3>
                <p className="text-muted-foreground">
                  مواكبة لأحدث صيحات الموضة العالمية لضمان مظهر أنيق وعصري يلائم ذوقك.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* قسم دعوة لاتخاذ إجراء */}
        <section className="py-16 text-center" dir="rtl">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              انضم إلى عائلة Rush Kicks
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              استكشف مجموعاتنا اليوم واكتشف الفرق الذي تصنعه الجودة والراحة الفائقة.
            </p>
            <Button
              size="lg"
              className="bg-gold hover:bg-gold/90 text-white text-lg"
              // تم إزالة onClick={() => window.location.href = "/collections"}
            >
              تسوق الآن
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};