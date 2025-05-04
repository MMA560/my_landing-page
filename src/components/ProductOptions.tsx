import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ColorVariant } from "./Gallery";

type SizeOption = {
  value: string;
  label: string;
};

const sizes: SizeOption[] = [
  { value: "7", label: "41" },
  { value: "8", label: "42" },
  { value: "9", label: "43" },
  { value: "10", label: "44" },
  { value: "11", label: "45" },
];

const colors: ColorVariant[] = [
  { value: "black", label: "أسود", hex: "#000000" },
  { value: "brown", label: "بني", hex: "#964B00" },
  { value: "tan", label: "بيج", hex: "#D2B48C" },
  { value: "burgundy", label: "خمري", hex: "#800020" },
];

type ProductOptionsProps = {
  onSizeChange: (size: string) => void;
  onColorChange: (color: string) => void;
  selectedSize: string | null;
  selectedColor: string | null;
  vertical?: boolean;
};

export const ProductOptions: React.FC<ProductOptionsProps> = ({ 
  onSizeChange, 
  onColorChange, 
  selectedSize, 
  selectedColor,
  vertical = false
}) => {
  const handleSizeSelect = (size: string) => {
    onSizeChange(size);
  };

  const handleColorSelect = (color: string) => {
    onColorChange(color);
  };

  const layoutClass = vertical ? "space-y-6" : "flex flex-col-reverse md:flex-row-reverse md:gap-8 md:items-start";

  return (
    <div className={`${layoutClass} w-full`}>
      {/* اختيار الحجم */}
      <div className="space-y-3 flex-1 text-right">
        <h3 className="font-medium text-lg">اختر المقاس</h3>
        <div className="flex flex-wrap gap-2 justify-end">
          {sizes.map((size) => (
            <Button
              key={size.value}
              variant={selectedSize === size.value ? "default" : "outline"}
              className={`min-w-[4rem] ${
                selectedSize === size.value ? "bg-primary text-primary-foreground" : ""
              }`}
              onClick={() => handleSizeSelect(size.value)}
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      {/* اختيار اللون */}
      <div className="space-y-3 flex-1 mt-6 md:mt-0 ">
        <h3 className="font-medium text-lg">اختر اللون</h3>
        <div className="flex flex-wrap gap-3 justify-start" style={{ flexDirection: "row-reverse" }}>
          {colors.map((color) => (
            <button
              key={color.value}
              aria-label={`اللون: ${color.label}`}
              className={`w-8 h-8 rounded-full relative ${
                selectedColor === color.value 
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background" 
                  : ""
              }`}
              onClick={() => handleColorSelect(color.value)}
              style={{ backgroundColor: color.hex }}
            >
              <span className="sr-only">{color.label}</span>
            </button>
          ))}
        </div>
        {selectedColor && (
          <p className="text-sm text-muted-foreground">
            اللون المحدد: {colors.find(c => c.value === selectedColor)?.label}
          </p>
        )}
      </div>
    </div>
  );
};
