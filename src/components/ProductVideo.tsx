import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const ProductVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVideo = () => {
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-serif text-center">فيديو المنتج</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="relative aspect-video bg-muted overflow-hidden rounded-lg border border-border">
          {isPlaying ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Product Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=1635&auto=format&fit=crop"
                alt="صورة مصغرة للفيديو"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
              <Button
                onClick={handlePlayVideo}
                size="icon"
                className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
                aria-label="تشغيل الفيديو"
              >
                <Play className="h-8 w-8" fill="currentColor" />
              </Button>
              <p className="text-white z-10 mt-4 font-medium text-lg">
                شاهد نظرة عامة على المنتج
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4 text-right">
          <h4 className="text-lg font-medium">الحرفية في حركة</h4>
          <p className="text-muted-foreground">
            استمتع بتفاصيل الدقة التي تدخل في صناعة كل زوج من أحذية "ميترو
            أوكسفورد". يعرض هذا الفيديو عملية اختيار الجلد الفاخر، وتقنيات
            الخياطة اليدوية، والتلميع النهائي الذي يمنح كل حذاء لمعانه وطابعه
            المميز.
          </p>
          <ul className="space-y-2 text-right">
            <li className="flex items-center gap-2 justify-start flex-row-reverse">
              <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
              <span>جلد طبيعي كامل الحبة مستخرج بطريقة أخلاقية</span>
            </li>
            <li className="flex items-center gap-2 justify-start flex-row-reverse">
              <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
              <span>تقنيات يدوية تقليدية</span>
            </li>
            <li className="flex items-center gap-2 justify-start flex-row-reverse">
              <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
              <span>معايير صارمة لمراقبة الجودة</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
