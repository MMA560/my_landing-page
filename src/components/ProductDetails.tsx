import React from "react";

const productDetailsData = {
  description:
    'كوتشي Nike SV5 هو خيارك الأمثل لأي مشوار، مصمم ليناسب نمط حياتك اليومي بخامات مستوردة، ونعل P.V.C بيور، وراحة ما تتنسيش. كل تفصيلة فيه بتجمع بين الشكل العصري والجودة العالية.',
  sections: [
    {
      title: "الخامات والتصنيع",
      items: [
        "سطح خارجي بخامات مستوردة قوية وسهلة التنظيف",
        "نعل خارجي P.V.C بيور يوفر مرونة وثبات عالي",
        "فرش داخلي طبي مريح بيدعم القدم طوال اليوم",
        "تلبيس مضبوط بيضمن ثبات الكوتشي على القدم بدون زحلقة",
      ],
    },
    {
      title: "الميزات والفوائد",
      items: [
        "مناسب للخروجات، الشغل، والمشاوير اليومية",
        "خفيف الوزن وسهل في اللبس والخلع",
        "تصميم أنيق وعملي بلون موحد أو مطعّم بيج",
        "متوفر بـ3 ألوان: أسود – أسود×بيج – أزرق×بيج، وبالمقاسات من 41 لـ45",
      ],
    },
  ],
};


export const ProductDetails = () => {
  return (
    <div className="space-y-6 text-right" dir="rtl">
      <h3 className="text-xl font-serif text-center">تفاصيل المنتج</h3>

      <div className="space-y-4">
        <p className="text-muted-foreground">{productDetailsData.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {productDetailsData.sections.map((section, index) => (
            <div key={index} className="space-y-3">
              <h4 className="font-medium">{section.title}</h4>
              <ul className="space-y-2 text-sm">
                {section.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 justify-end"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 order-last"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
