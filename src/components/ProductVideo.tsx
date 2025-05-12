import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FrontendProductVideoData } from "@/types/product";

interface ProductVideoProps {
    videoInfo: FrontendProductVideoData;
}

export const ProductVideo: React.FC<ProductVideoProps> = ({ videoInfo }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="space-y-6">
            <h3 className="text-xl font-serif text-center">{videoInfo.title}</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                <div className="relative aspect-video bg-muted overflow-hidden rounded-lg border border-border">
                    {isPlaying ? (
                        <video
                            className="absolute inset-0 w-full h-full"
                            src={videoInfo.videoUrl}
                            controls
                            autoPlay
                        />
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <img
                                src={videoInfo.thumbnail}
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
                                {videoInfo.overlayText}
                            </p>
                        </div>
                    )}
                </div>

                <div className="space-y-4 text-right">
                    <h4 className="text-lg font-medium">{videoInfo.descriptionTitle}</h4>
                    <p className="text-muted-foreground">{videoInfo.description}</p>
                    <ul className="space-y-2 text-right">
                        {videoInfo.features.map((feature, index) => (
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