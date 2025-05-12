import React from "react";
import { Header } from "@/components/Header"; // تأكد من المسار الصحيح
import { Footer } from "@/components/Footer"; // تأكد من المسار الصحيح
import { Ruler, CheckCircle, Footprints, Info, Scale } from "lucide-react";

export const SizingGuide = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="py-12" >
        <div className="container mx-auto px-4">
          {/* قسم العنوان الرئيسي */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              دليل المقاسات
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              اعثر على مقاسك المثالي في Rush Kicks بخطوات بسيطة ومخططات دقيقة لضمان أفضل ملاءمة.
            </p>
          </section>

          {/* قسم كيفية قياس قدمك */}
          <section className="bg-card rounded-lg border border-border p-8 shadow-sm mb-12">
            <h2 className="text-3xl font-serif font-bold text-right mb-8 flex items-center justify-end gap-3">
              <Ruler className="w-8 h-8 text-primary" />
              كيف تقيس قدمك؟
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
              <div className="flex flex-col items-end text-right space-y-3">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <span className="text-primary font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold">التحضير</h3>
                <p className="text-muted-foreground">
                  احضر ورقة بيضاء، قلم رصاص، ومسطرة. ارتد الجوارب التي عادةً ما ترتديها مع أحذيتنا.
                </p>
                <img
                  src="http://googleusercontent.com/image_collection/image_retrieval/13592779779029680569"
                  alt="التحضير للقياس"
                  className="w-full max-w-[250px] h-auto rounded-md mt-4"
                />
              </div>

              <div className="flex flex-col items-end text-right space-y-3">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <span className="text-primary font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold">تتبع القدم</h3>
                <p className="text-muted-foreground">
                  ضع قدمك على الورقة مع إبقاء الكعب مستقيماً على حائط. تتبع محيط قدمك بالقلم الرصاص بحذر. كرر العملية للقدم الأخرى.
                </p>
                <img
                  src="http://googleusercontent.com/image_collection/image_retrieval/14907518942728037747"
                  alt="تتبع القدم"
                  className="w-full max-w-[250px] h-auto rounded-md mt-4"
                />
              </div>

              <div className="flex flex-col items-end text-right space-y-3">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <span className="text-primary font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold">القياس</h3>
                <p className="text-muted-foreground">
                  قس الطول من الكعب إلى أطول إصبع. قس أوسع جزء من القدم (العرض). سجل كلا القياسين بالسنتمتر.
                </p>
                <img
                  src="http://googleusercontent.com/image_collection/image_retrieval/12989058980231371728"
                  alt="قياس القدم"
                  className="w-full max-w-[250px] h-auto rounded-md mt-4"
                />
              </div>
            </div>

            <div className="mt-10 p-6 bg-secondary/20 rounded-lg text-right">
              <h3 className="text-xl font-semibold mb-4 flex items-center justify-end gap-2">
                <Info className="w-6 h-6 text-blue-500" />
                نصائح إضافية:
              </h3>
              <ul className="list-none space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2 flex-row-reverse">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>قم بالقياس في نهاية اليوم، حيث تكون القدمان في أكبر حجم لهما.</span>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>قم بقياس كلتا القدمين واختر المقاس الذي يناسب القدم الأكبر.</span>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                  <span>قارن قياساتك بمخطط المقاسات أدناه.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* قسم مخطط المقاسات */}
          <section className="bg-card rounded-lg border border-border p-8 shadow-sm mb-12">
            <h2 className="text-3xl font-serif font-bold text-right mb-8 flex items-center justify-end gap-3">
              <Scale className="w-8 h-8 text-primary" />
              مخطط المقاسات
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-secondary text-foreground">
                    <th className="py-3 px-4 border border-border">طول القدم (سم)</th>
                    <th className="py-3 px-4 border border-border">مقاس الاتحاد الأوروبي (EU)</th>
                    <th className="py-3 px-4 border border-border">مقاس الولايات المتحدة (رجالي)</th>
                    <th className="py-3 px-4 border border-border">مقاس الولايات المتحدة (نسائي)</th>
                    <th className="py-3 px-4 border border-border">مقاس المملكة المتحدة (UK)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* بيانات أمثلة - يجب استبدالها ببياناتك الفعلية */}
                  <tr className="bg-background text-muted-foreground">
                    <td className="py-3 px-4 border border-border">22.5</td>
                    <td className="py-3 px-4 border border-border">36</td>
                    <td className="py-3 px-4 border border-border">4.5</td>
                    <td className="py-3 px-4 border border-border">6</td>
                    <td className="py-3 px-4 border border-border">3.5</td>
                  </tr>
                  <tr className="bg-card text-muted-foreground">
                    <td className="py-3 px-4 border border-border">23</td>
                    <td className="py-3 px-4 border border-border">36.5</td>
                    <td className="py-3 px-4 border border-border">5</td>
                    <td className="py-3 px-4 border border-border">6.5</td>
                    <td className="py-3 px-4 border border-border">4</td>
                  </tr>
                  <tr className="bg-background text-muted-foreground">
                    <td className="py-3 px-4 border border-border">23.5</td>
                    <td className="py-3 px-4 border border-border">37</td>
                    <td className="py-3 px-4 border border-border">5.5</td>
                    <td className="py-3 px-4 border border-border">7</td>
                    <td className="py-3 px-4 border border-border">4.5</td>
                  </tr>
                  <tr className="bg-card text-muted-foreground">
                    <td className="py-3 px-4 border border-border">24</td>
                    <td className="py-3 px-4 border border-border">38</td>
                    <td className="py-3 px-4 border border-border">6</td>
                    <td className="py-3 px-4 border border-border">7.5</td>
                    <td className="py-3 px-4 border border-border">5</td>
                  </tr>
                  {/* ... أضف المزيد من الصفوف هنا */}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-6 text-right">
              <Info className="w-4 h-4 inline-block ml-2 text-blue-500" />
              **ملاحظة هامة:** قد تختلف المقاسات قليلاً بين موديلات الأحذية المختلفة. يرجى مراجعة وصف المنتج المحدد للحصول على تفاصيل إضافية حول المقاس.
            </p>
          </section>

          {/* قسم نصائح لاختيار المقاس المناسب */}
          <section className="bg-card rounded-lg border border-border p-8 shadow-sm">
            <h2 className="text-3xl font-serif font-bold text-right mb-8 flex items-center justify-end gap-3">
              <Footprints className="w-8 h-8 text-primary" />
              نصائح لاختيار المقاس المناسب
            </h2>
            <ul className="list-none space-y-4 text-lg text-muted-foreground text-right">
              <li className="flex items-start gap-2 flex-row-reverse">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                <span>يجب أن يكون هناك مسافة صغيرة (حوالي عرض إبهامك) بين أطول إصبع وقدم الحذاء.</span>
              </li>
              <li className="flex items-start gap-2 flex-row-reverse">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                <span>يجب أن يكون الجزء الأعرض من قدمك مناسباً بشكل مريح داخل أوسع جزء من الحذاء دون ضغط أو انزلاق.</span>
              </li>
              <li className="flex items-start gap-2 flex-row-reverse">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                <span>ارتدِ الحذاء وجرب المشي به قليلاً للتأكد من شعورك بالراحة وأنه لا يوجد أي احتكاك.</span>
              </li>
              <li className="flex items-start gap-2 flex-row-reverse">
                <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                <span>إذا كنت بين مقاسين، نوصي باختيار المقاس الأكبر قليلاً، خاصة للأحذية التي ترتديها مع جوارب سميكة.</span>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};