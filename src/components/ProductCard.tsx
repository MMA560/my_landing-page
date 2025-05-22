// src/components/ProductCard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductOut } from "@/types/product";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductCardProps {
  product: ProductOut;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(
      isFavorite
        ? "تمت إزالة المنتج من المفضلة"
        : "تمت إضافة المنتج إلى المفضلة"
    );
  };

  const addToCart = () => {
    toast.success(`تمت إضافة ${product.name} إلى سلة التسوق`);
  };

  const discountPercentage =
    product.discount ||
    (product.oldPrice
      ? Math.round(
          ((product.oldPrice - product.price) / product.oldPrice) * 100
        )
      : 0);

  const mainImageUrl =
    product.mainImage ||
    (product.availableColors?.[0]?.value &&
      product.galleryImages?.[product.availableColors[0]?.value]?.[0]?.src);

  const currencyLabel =
    typeof window !== "undefined" && window.innerWidth >= 768 ? "جنيه" : "ج";

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="group overflow-hidden border-border/40 transition-all duration-300 hover:shadow-md block hover:border-primary/50"
      dir="rtl"
    >
      <Card className="h-full flex flex-col">
        <div className="relative overflow-hidden aspect-square">
          {mainImageUrl && (
            <img
              src={mainImageUrl}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite();
            }}
            className="absolute top-1.5 left-1.5 md:top-2 md:left-2 flex h-6 w-6 md:h-7 md:w-7 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background rtl:left-auto rtl:right-1.5 md:rtl:right-2"
            aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <Heart
              className={cn(
                "h-3 w-3 md:h-4 md:w-4 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-foreground"
              )}
            />
          </button>
          <div className="absolute top-1.5 right-1.5 md:top-2 md:right-2 flex flex-col gap-0.5 md:gap-1 rtl:right-auto rtl:left-1.5 md:rtl:left-2">
            {product.tags?.some((tag) => tag.id.toLowerCase() === "new") && (
              <Badge className="bg-gold text-white text-[9px] md:text-[10px] px-1 md:px-1.5 py-0.5">
                جديد
              </Badge>
            )}
            {discountPercentage > 0 && (
              <Badge className="bg-red-500 text-white text-[9px] md:text-[10px] px-1 md:px-1.5 py-0.5">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
        </div>
        <CardContent className="grid gap-1 md:gap-1.5 p-2 md:p-3 flex-grow">
          <h3 className="font-medium text-xs md:text-sm line-clamp-1">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-[10px] md:text-xs line-clamp-1">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-1 md:mt-1.5">
            <div className="flex items-center gap-1 md:gap-1.5">
              <span className="text-xs md:text-sm font-semibold">
                {currencyLabel} {product.price?.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-[10px] md:text-xs text-muted-foreground line-through">
                  {currencyLabel} {product.oldPrice?.toFixed(2)}
                </span>
              )}
            </div>
            <Button
              size="sm"
              className="bg-gold hover:bg-gold/90 text-white h-6 md:h-7 px-1.5 md:px-2 text-[10px] md:text-xs"
              onClick={(e) => {
                e.preventDefault();
                navigate(`/products/${product.id}`);
              }}
            >
              <ShoppingCart className="ml-0.5 md:ml-1 h-2.5 w-2.5 md:h-3 md:w-3 rtl:mr-0.5 rtl:ml-0 md:rtl:mr-1 md:rtl:ml-0" />
              شراء
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
