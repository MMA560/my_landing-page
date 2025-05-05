import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type GalleryImage = {
  src: string;
  alt: string;
};

const colorImages: Record<string, GalleryImage[]> = {
  black: [
    {
      src: "https://i.imgur.com/gkXVquK.png",
      alt: "شوز أسود - واجهة"
    },
    {
      src: "https://i.imgur.com/0isafsF.png",
      alt: "شوز أسود - جانب"
    },
    {
      src: "https://i.imgur.com/qsHKkR3.png",
      alt: "شوز أسود مطعم بيج - جانب"
    },
    {
      src: "https://i.imgur.com/WbdKmPn.png",
      alt: "شوز أزرق مطعم بيج - جانب"
    }
  ],
  "black-tan-beige": [
    {
      src: "https://i.imgur.com/qsHKkR3.png",
      alt: "شوز أسود مطعم بيج - جانب"
    },
    {
      src: "https://i.imgur.com/0isafsF.png",
      alt: "شوز أسود - جانب"
    },
    {
      src: "https://i.imgur.com/WbdKmPn.png",
      alt: "شوز أزرق مطعم بيج - جانب"
    },
    {
      src: "https://i.imgur.com/gkXVquK.png",
      alt: "شوز أسود - واجهة"
    }
  ],
  "blue-tan-beige": [
    {
      src: "https://i.imgur.com/WbdKmPn.png",
      alt: "شوز أزرق مطعم بيج - جانب"
    },
    {
      src: "https://i.imgur.com/0isafsF.png",
      alt: "شوز أسود - جانب"
    },
    {
      src: "https://i.imgur.com/qsHKkR3.png",
      alt: "شوز أسود مطعم بيج - جانب"
    },
    {
      src: "https://i.imgur.com/gkXVquK.png",
      alt: "شوز أسود - واجهة"
    }
  ]
};

interface GalleryProps {
  selectedColor: string;
}

export const Gallery: React.FC<GalleryProps> = ({ selectedColor }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = colorImages[selectedColor] || colorImages.black;

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const selectImage = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full">
      <div className="relative overflow-hidden aspect-square rounded-lg mb-4">
        <div className="absolute inset-0">
          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            className="w-full h-full object-cover"
          />
        </div>

        <Button
          variant="secondary"
          size="icon"
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background/90 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full bg-background/70 backdrop-blur-sm hover:bg-background/90 z-10"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex space-x-2 overflow-x-auto scrollbar-none pb-2 justify-center">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => selectImage(index)}
            className={`w-16 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all ${
              index === activeIndex
                ? "ring-2 ring-gold ring-offset-2 ring-offset-background"
                : "opacity-70 hover:opacity-100"
            }`}
            aria-label={`عرض ${image.alt}`}
          >
            <img
              src={image.src}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
