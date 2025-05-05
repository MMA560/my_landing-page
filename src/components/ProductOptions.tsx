import { Button } from "@/components/ui/button";

type ColorVariant = {
  value: string;
  label: string;
  image: string;
};

type SizeOption = {
  value: string;
  label: string;
};

const sizes: SizeOption[] = [
  { value: "41", label: "41" },
  { value: "42", label: "42" },
  { value: "43", label: "43" },
  { value: "44", label: "44" },
  { value: "45", label: "45" },
];

const colors: ColorVariant[] = [
  { value: "black", label: "أسود", image: "https://i.imgur.com/0isafsF.png" },
  { value: "black-tan", label: "أسود مطعم بيج", image: "https://i.imgur.com/qsHKkR3.png" },
  { value: "blue-tan", label: "أزرق مطعم بيج", image: "https://i.imgur.com/WbdKmPn.png" },
];

type ProductOptionsProps = {
  onSizeChange: (size: string) => void;
  onColorChange: (color: string, image?: string) => void;
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

  const handleColorSelect = (color: ColorVariant) => {
    onColorChange(color.value, color.image);
  };

  const layoutClass = vertical
    ? "space-y-6"
    : "flex flex-col-reverse md:flex-row-reverse md:gap-8 md:items-start";

  return (
    <div className={`${layoutClass} w-full`}>
      
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

      <div className="space-y-3 flex-1 mt-6 md:mt-0">
        <h3 className="font-medium text-lg">اختر اللون</h3>
        <div className="flex flex-wrap gap-3 justify-start" style={{ flexDirection: "row-reverse" }}>
          {colors.map((color) => (
            <button
              key={color.value}
              aria-label={`اللون: ${color.label}`}
              className={`w-10 h-10 rounded-full overflow-hidden border relative ${
                selectedColor === color.value
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : ""
              }`}
              onClick={() => handleColorSelect(color)}
            >
              <img
                src={color.image}
                alt={color.label}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {selectedColor && (
          <p className="text-sm text-muted-foreground text-right">
            اللون المحدد: {colors.find(c => c.value === selectedColor)?.label}
          </p>
        )}
      </div>
    </div>
  );
};
