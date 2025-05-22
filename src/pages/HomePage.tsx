// src/pages/HomePage.tsx
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroBanner } from "@/components/HeroBanner";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import ProductSection from "@/components/ProductSection";
import { useQuery } from "@tanstack/react-query";
import { ProductOut } from "@/types/product";
import { RefreshCcwDot } from "lucide-react";

const fetchProducts = async (): Promise<ProductOut[]> => {
  const response = await fetch(
    "http://localhost:8000/order-app/api/v1/products",
    {
      headers: {
        accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const HomePage = () => {
  const [visibleProductsCount, setVisibleProductsCount] = useState(9);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const handleViewMore = () => {
    setVisibleProductsCount((prevCount) => prevCount + 9);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground space-y-4">
        <RefreshCcwDot className="animate-spin mr-2" size={60} />
        جارٍ التحميل
      </div>
    );
  }

  if (isError) {
    return <div>حدث خطأ في تحميل المنتجات: {error?.message}</div>;
  }

  const displayedProducts = data?.slice(0, visibleProductsCount) || [];
  const hasMore = data ? visibleProductsCount < data.length : false;

  return (
    <div className="min-h-screen rtl-flex-row">
      <Header />

      <main>
        {/*<HeroBanner />*/}
        {/*<FeaturedCategories />*/}
        <ProductSection
          data={displayedProducts}
          fetchNextPage={handleViewMore}
          hasNextPage={hasMore}
          isFetchingNextPage={false}
        />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
