import React from "react";

// نوع البيانات لكل ميزة
type HighlightProps = {
  title: string;
  description: string;
  iconName: string;
};

// دالة لإرجاع الأيقونة حسب الاسم
const getIconByName = (name: string): React.ReactNode => {
  switch (name) {
    case "leather":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M3 8c0-3.5 2.5-6 6.5-6S16 4.5 16 8s-2 4-6 4m-4 0c-3.5 0-6 2.5-6 6s2.5 6 6 6 6-2.5 6-6m-4 0c-4 0-6-2-6-6" />
        </svg>
      );
    case "handmade":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
        </svg>
      );
    case "comfort":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M8 3v2m0 16v-2" />
          <path d="M13 6v2m0 8v2" />
          <path d="M18 9v2m0 4v-2" />
          <path d="M3 6v12" />
        </svg>
      );
    case "eco":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
          <path d="m16 16-4-4-4 4" />
          <path d="M8 16v4" />
        </svg>
      );
    default:
      return null;
  }
};

// مكون يعرض ميزة واحدة
const Highlight: React.FC<HighlightProps> = ({ title, description, iconName }) => {
  return (
    <div className="flex flex-col sm:flex-row-reverse items-start sm:items-center gap-3 p-4 rounded-lg border border-border">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
        {getIconByName(iconName)}
      </div>
      <div className="text-right">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

// مصفوفة المميزات (قابلة للربط مع قاعدة بيانات)
const highlightsData: HighlightProps[] = [
  {
    title: "جلد فاخر",
    description: "جلد إيطالي طبيعي مختار بعناية لجودته ومتانته.",
    iconName: "leather",
  },
  {
    title: "صناعة يدوية",
    description: "يُصنع كل زوج بعناية فائقة على يد حرفيينا المهرة في البرتغال.",
    iconName: "handmade",
  },
  {
    title: "تقنية الراحة",
    description: "نظام تبطين متطور يمنحك راحة ودعماً طوال اليوم.",
    iconName: "comfort",
  },
  {
    title: "مواد مستدامة",
    description: "تصنيع صديق للبيئة باستخدام مواد يتم الحصول عليها بمسؤولية.",
    iconName: "eco",
  },
];

// المكون الرئيسي
export const ProductHighlights = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-serif text-center">مميزات المنتج</h3>

      <div className="grid gap-3 sm:grid-cols-2">
        {highlightsData.map((item, index) => (
          <Highlight
            key={index}
            title={item.title}
            description={item.description}
            iconName={item.iconName}
          />
        ))}
      </div>
    </div>
  );
};
