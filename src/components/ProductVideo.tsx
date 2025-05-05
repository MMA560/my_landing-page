import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const videoData = {
  title: "فيديو المنتج",
  videoUrl: "https://i.imgur.com/DHsgVM2.mp4",
  thumbnail: "https://i.imgur.com/gkXVquK.png", // ✅ تم التعديل هنا
  overlayText: "شاهد نظرة عامة على المنتج",
  descriptionTitle: "الدقة في التصنيع",
  description:
  'انطلق بثقة وأناقة مع كوتشي **NIKE SV5** – الخيار الأمثل لكل المهام اليومية والخروجات. في هذا الفيديو، نأخذك في جولة سريعة لاكتشاف روعة التصميم، جودة الخامات المستوردة، والنعل الـP.V.C البيور الذي يضمن راحة القدم مع كل خطوة. شاهِد كيف يجمع هذا الحذاء بين الفخامة والعملية، بفرش طبي وتلبيس مظبوط يناسب مختلف الأذواق. متوفر بمقاسات من 41 إلى 45 وبألوان جذابة: أسود، أسود مطعّم بيج، وأزرق مطعّم بيج.',  features: [
    "اطلالة انيقة تخطف الانظار",
    "خامات عالية الجودة",
    "معايير تصميم عالية",
  ],
};


export const ProductVideo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-serif text-center">{videoData.title}</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        <div className="relative aspect-video bg-muted overflow-hidden rounded-lg border border-border">
          {isPlaying ? (
            <video
              className="absolute inset-0 w-full h-full"
              src={videoData.videoUrl}
              controls
              autoPlay
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                src={videoData.thumbnail}
                alt="صورة مصغرة للفيديو"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
              <Button
                onClick={() => setIsPlaying(true)}
                size="icon"
                className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 z-10"
                aria-label="تشغيل الفيديو"
              >
                <Play className="h-8 w-8" fill="currentColor" />
              </Button>
              <p className="text-white z-10 mt-4 font-medium text-lg">
                {videoData.overlayText}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4 text-right">
          <h4 className="text-lg font-medium">{videoData.descriptionTitle}</h4>
          <p className="text-muted-foreground">{videoData.description}</p>
          <ul className="space-y-2 text-right">
            {videoData.features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-2 justify-start flex-row-reverse"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
