
import React from "react";

interface CategoryCardProps {
  name: string;
  image: string;
  count: number;
}

const CategoryCard = ({ name, image, count }: CategoryCardProps) => (
  <div className="group relative overflow-hidden rounded-lg">
    <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
    
    <img
      src={image}
      alt={name}
      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
    />
    
    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center text-white">
      <h3 className="text-lg font-medium">{name}</h3>
      <p className="mt-1 text-xs">{count} منتج</p>
    </div>
  </div>
);

export const FeaturedCategories = () => {
  const categories = [
    { name: "أوكسفورد", image: "/images/category-oxford.jpg", count: 12 },
    { name: "ديربي", image: "/images/category-derby.jpg", count: 8 },
    { name: "لوفر", image: "/images/category-loafers.jpg", count: 10 },
    { name: "بوت", image: "/images/category-boots.jpg", count: 15 },
  ];

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-serif text-xl font-medium sm:text-2xl">
          تسوق حسب الفئة
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          استكشف مجموعتنا المنتقاة من فئات الأحذية الفاخرة
        </p>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.name} {...category} />
        ))}
      </div>
    </section>
  );
};