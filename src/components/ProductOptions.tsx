import { Button } from "@/components/ui/button";
import { FrontendColorVariant, FrontendSizeOption } from "@/types/product";

type ProductOptionsProps = {
    availableSizes: FrontendSizeOption[];
    availableColors: FrontendColorVariant[];
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
    availableSizes,
    availableColors,
    vertical = false
}) => {
    const handleSizeSelect = (size: string) => {
        onSizeChange(size);
    };

    const handleColorSelect = (color: FrontendColorVariant) => {
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
                    {availableSizes.map((size) => (
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
                    {availableColors.map((color) => (
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
                        اللون المحدد: {availableColors.find(c => c.value === selectedColor)?.label}
                    </p>
                )}
            </div>
        </div>
    );
};