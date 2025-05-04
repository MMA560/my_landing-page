
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ColorVariant = {
  value: string;
  label: string;
  hex: string;
};

// Images for each color variant
const colorImages: Record<string, GalleryImage[]> = {
  black: [
    {
      src: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1587&auto=format&fit=crop",
      alt: "Premium black leather shoe - Front view"
    },
    {
      src: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1665&auto=format&fit=crop",
      alt: "Premium black leather shoe - Side view"
    },
    {
      src: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1480&auto=format&fit=crop",
      alt: "Premium black leather shoe - Back view"
    },
    {
      src: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1635&auto=format&fit=crop",
      alt: "Premium black leather shoe - Detail view"
    }
  ],
  brown: [
    {
      src: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=1480&auto=format&fit=crop",
      alt: "Premium brown leather shoe - Front view"
    },
    {
      src: "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1665&auto=format&fit=crop",
      alt: "Premium brown leather shoe - Side view"
    },
    {
      src: "https://images.unsplash.com/photo-1542834292-514e3258be4d?q=80&w=1587&auto=format&fit=crop",
      alt: "Premium brown leather shoe - Back view"
    },
    {
      src: "https://images.unsplash.com/photo-1626947346165-4c2288dadc2f?q=80&w=1480&auto=format&fit=crop",
      alt: "Premium brown leather shoe - Detail view"
    }
  ],
  tan: [
    {
      src: "https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?q=80&w=1480&auto=format&fit=crop",
      alt: "Premium tan leather shoe - Front view"
    },
    {
      src: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1528&auto=format&fit=crop",
      alt: "Premium tan leather shoe - Side view"
    },
    {
      src: "https://images.unsplash.com/photo-1574498464237-056244a52276?q=80&w=1480&auto=format&fit=crop",
      alt: "Premium tan leather shoe - Back view"
    },
    {
      src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1480&auto=format&fit=crop",
      alt: "Premium tan leather shoe - Detail view"
    }
  ],
  burgundy: [
    {
      src: "https://images.unsplash.com/photo-1544155891-968d8047f63d?q=80&w=1480&auto=format&fit=crop",
      alt: "Premium burgundy leather shoe - Front view"
    },
    {
      src: "https://images.unsplash.com/photo-1559334417-1adb87b6c5c2?q=80&w=1480&auto=format&fit=crop",
      alt: "Premium burgundy leather shoe - Side view"
    },
    {
      src: "https://images.unsplash.com/photo-1613487665807-c8a89c5b5311?q=80&w=1587&auto=format&fit=crop",
      alt: "Premium burgundy leather shoe - Back view"
    },
    {
      src: "https://images.unsplash.com/photo-1573100925118-870b8efc799d?q=80&w=1587&auto=format&fit=crop",
      alt: "Premium burgundy leather shoe - Detail view"
    }
  ]
};

type GalleryImage = {
  src: string;
  alt: string;
};

interface GalleryProps {
  selectedColor: string;
}

export const Gallery: React.FC<GalleryProps> = ({ selectedColor = "black" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Use the images for the selected color, or default to black if color not found
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
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
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
            aria-label={`View ${image.alt}`}
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
