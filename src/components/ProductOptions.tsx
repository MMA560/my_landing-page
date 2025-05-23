import { Button } from "@/components/ui/button";
import { FrontendColorVariant, FrontendSizeOption, FrontendProductInventory } from "@/types/product"; // Import FrontendProductInventory

type ProductOptionsProps = {
    availableSizes: FrontendSizeOption[];
    availableColors: FrontendColorVariant[];
    onSizeChange: (size: string) => void;
    onColorChange: (color: string, image?: string) => void;
    selectedSize: string | null;
    selectedColor: string | null;
    vertical?: boolean;
    inventory: FrontendProductInventory; // New prop for inventory
    selectedGalleryColor?: string; // Prop from parent for Gallery, not used here but good to keep it consistent
};

export const ProductOptions: React.FC<ProductOptionsProps> = ({
    onSizeChange,
    onColorChange,
    selectedSize,
    selectedColor,
    availableSizes,
    availableColors,
    vertical = false,
    inventory
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
                    {availableSizes.map((size) => {
                        // Check if this size is available for the currently selected color
                        // Or if no color is selected, check if it's available with any color (more complex, let's keep it simple for now)
                        const isSizeInStock = selectedColor
                            ? (inventory[selectedColor]?.[size.value] || 0) > 0
                            : true; // Assume available if no color selected or no inventory specified
                        return (
                            <Button
                                key={size.value}
                                variant={selectedSize === size.value ? "default" : "outline"}
                                className={`min-w-[4rem] ${
                                    selectedSize === size.value ? "bg-primary text-primary-foreground" : ""
                                } ${!isSizeInStock ? "opacity-50 cursor-not-allowed line-through" : ""}`} // Added styles for out of stock
                                onClick={() => handleSizeSelect(size.value)}
                                disabled={!isSizeInStock} // Disable if out of stock
                            >
                                {size.label}
                            </Button>
                        );
                    })}
                </div>
            </div>

            <div className="space-y-3 flex-1 mt-6 md:mt-0">
                <h3 className="font-medium text-lg">اختر اللون</h3>
                <div className="flex flex-wrap gap-3 justify-start" style={{ flexDirection: "row-reverse" }}>
                    {availableColors.map((color) => {
                        // Check if this color has any stock for any size, or for the currently selected size
                        const isColorInStock = selectedSize
                            ? (inventory[color.value]?.[selectedSize] || 0) > 0
                            : Object.values(inventory[color.value] || {}).some(qty => qty > 0); // Check if any size is in stock for this color
                        return (
                            <button
                                key={color.value}
                                aria-label={`اللون: ${color.label}`}
                                className={`w-16 h-16 sm:w-16 sm:h-16 md:w-14 md:h-14 rounded-full overflow-hidden border relative ${
                                    selectedColor === color.value
                                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                        : ""
                                } ${!isColorInStock ? "opacity-50 cursor-not-allowed grayscale" : ""}`} // Added styles for out of stock
                                onClick={() => handleColorSelect(color)}
                                disabled={!isColorInStock} // Disable if out of stock
                            >
                                <img
                                    src={color.image}
                                    alt={color.label}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        );
                    })}
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