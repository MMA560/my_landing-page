import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Truck, ArrowRightLeft, Undo2, Info, XCircle } from "lucide-react";

export const Policies = () => {
  return (
    <div className="min-h-screen bg-background text-foreground"> {/* Added main container for Header/Footer context */}
      <Header /> {/* Header placed at the top of the page */}

      <section className="py-12 bg-background text-foreground" >
        <div className="container mx-auto px-4">
          <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-10">
              سياساتنا
            </h2>

            {/* Delivery Policy */}
            <div className="mb-12 space-y-4">
              <h3 className="flex items-center justify-end gap-3 text-2xl font-bold text-right mb-4">
                <Truck className="w-7 h-7 text-primary shrink-0" /> {/* Added shrink-0 */}
                سياسة توصيل الطلبات
              </h3>
              <ul className="list-none space-y-3 text-lg text-muted-foreground">
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <span>
                    يتم توصيل الأوردرات داخل القاهرة والجيزة خلال 3 أيام عمل من وقت خروج الأوردر للشحن.
                  </span>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <span>
                    توصيل باقي المحافظات يستغرق من 3 إلى 5 أيام عمل.
                  </span>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <span>
                    مصاريف الشحن ثابتة 60 جنيهًا مصريًا لجميع المحافظات.
                  </span>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <span>
                    متاح المعاينة مع المندوب للتأكد أن الأوردر وصل بدون عيوب مصنع أو أي مشكلة أخرى.
                  </span>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <span>
                    في حال ظهور عيب مصنع أو مشكلة، العميل لا يدفع مصاريف الشحن وسيتم عمل أوردر استبدال له.
                  </span>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <XCircle className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                  <span>
                    إذا رفض العميل الاستلام لأي سبب آخر (غير عيب مصنع أو مشكلة)، فإنه سيدفع مصاريف الشحن.
                  </span>
                </li>
              </ul>
            </div>

            <hr className="border-t border-border my-8" />

            {/* Replacement Policy */}
            <div className="mb-12 space-y-4">
              <h3 className="flex items-center justify-end gap-3 text-2xl font-bold text-right mb-4">
                <ArrowRightLeft className="w-7 h-7 text-primary shrink-0" /> {/* Added shrink-0 */}
                سياسة الاستبدال
              </h3>
              <ul className="list-none space-y-3 text-lg text-muted-foreground">
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <div> {/* Changed span to div to allow block-level elements for indentation */}
                    <p className="mb-2"> {/* Added mb-2 for spacing */}
                      في حالة استلام العميل الأوردر مطابق للمواصفات التي أكدها مع خدمة العملاء (مقاس/لون) واستلم بدون معاينة، ولكنه يحتاج إلى استبدال لتغيير اللون أو المقاس:
                    </p>
                    {/* Manual indentation with margin-right */}
                    <div className="mr-8 space-y-1"> {/* Added mr-8 for indentation */}
                      <p dir="rtl">- يتم التواصل مع العميل، وطلب صور للمنتج للتأكد أنه على حالته الأصلية.</p>
                      <p dir="rtl">- يتم تسجيل أوردر استبدال والعميل يدفع مصاريف الشحن 60 جنيهًا.</p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <div> {/* Changed span to div */}
                    <p className="mb-2"> {/* Added mb-2 for spacing */}
                      في حالة وصول الأوردر بمقاس أو لون مختلف غير الذي طلبه، أو اتضح له عيب صناعة:
                    </p>
                    {/* Manual indentation with margin-right */}
                    <div className="mr-8 space-y-1"> {/* Added mr-8 for indentation */}
                      <p dir="rtl">- يتم التواصل مع العميل، وطلب صور للمنتج.</p>
                      <p dir="rtl">- يتم تسجيل أوردر استبدال بدون مصاريف شحن.</p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <XCircle className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                  <span>
                    الاستبدال غير متاح في الملابس الداخلية (رجالية/نسائية).
                  </span>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <span>
                    الاستبدال متاح في البناطيل والتيشيرتات وملابس الخروج بوجه عام، ما دام المنتج جديدًا بحالته الأصلية.
                  </span>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <span>
                    فترة السماح للاستبدال هي 14 يومًا من وقت استلام المنتج.
                  </span>
                </li>
              </ul>
            </div>

            <hr className="border-t border-border my-8" />

            {/* Return Policy */}
            <div className="space-y-4">
              <h3 className="flex items-center justify-end gap-3 text-2xl font-bold text-right mb-4">
                <Undo2 className="w-7 h-7 text-primary shrink-0" /> {/* Added shrink-0 */}
                سياسة الاسترجاع
              </h3>
              <ul className="list-none space-y-3 text-lg text-muted-foreground">
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <div> {/* Changed span to div */}
                    <p className="mb-2" dir="rtl"> {/* Added mb-2 for spacing */}
                      في حالة استلام العميل أوردر بدون معاينة، وطلب استرجاع الأوردر:
                    </p>
                    {/* Manual indentation with margin-right */}
                    <div className="mr-8 space-y-1"> {/* Added mr-8 for indentation */}
                      <p dir="rtl">- يتم طلب صور للمنتج.</p>
                      <p dir="rtl">- يتم تسجيل أوردر استرجاع وسيتم خصم 120 جنيهًا مصريًا من إجمالي المبلغ المدفوع، أو ترشيح بدائل تعجب العميل.</p>
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <XCircle className="w-5 h-5 text-red-500 mt-1 shrink-0" />
                  <span>
                    الاسترجاع غير متاح في الملابس الداخلية (رجالية/نسائية).
                  </span>
                </li>
                <li className="flex items-start gap-2 flex-row-reverse text-right"> {/* Added text-right */}
                  <Info className="w-5 h-5 text-blue-500 mt-1 shrink-0" />
                  <span>
                    فترة السماح للاسترجاع هي 14 يومًا من وقت استلام المنتج.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer /> {/* Footer placed at the bottom of the page */}
    </div>
  );
};