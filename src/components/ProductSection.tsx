// src/components/ProductSection.tsx
import React from "react";
import { ProductCard } from "@/components/ProductCard";
import { ProductOut } from "@/types/product";

interface ProductSectionProps {
  data: ProductOut[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}

const ProductSection = ({ 
  data, 
  fetchNextPage, 
  hasNextPage, 
  isFetchingNextPage
}: ProductSectionProps) => {

  return (
    <section className="w-full md:max-w-[65%] mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-serif text-xl font-medium sm:text-2xl">منتجاتنا الفاخرة</h2>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => fetchNextPage()}
            className="bg-gold hover:bg-gold/90 text-white font-bold py-2 px-4 rounded"
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? 'جاري تحميل المزيد...' : 'عرض المزيد'}
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductSection;