import React from "react";

const productDetailsData = {
  description:
    'يمثل حذاء "ميترو أوكسفورد" قمة تصميم الأحذية الحديثة الممزوجة بالحرفية التقليدية. يتم تصنيع كل زوج بعناية فائقة من جلد طبيعي كامل الحبة، تم اختياره يدويًا لجودته العالية ومتانته.',
  sections: [
    {
      title: "المواد وطريقة التصنيع",
      items: [
        "سطح علوي من جلد طبيعي كامل الحبة عالي الجودة",
        "تصميم مخيط بطريقة Goodyear لمتانة وسهولة إعادة التبطين",
        "بطانة كاملة من الجلد للراحة والتهوية",
        "نعل داخلي مملوء بالفلين يتشكل حسب شكل القدم",
      ],
    },
    {
      title: "الميزات والفوائد",
      items: [
        "تصميم متعدد الاستخدامات يناسب المناسبات الرسمية والعملية",
        "كعب معزز لمزيد من الثبات",
        "بطانة من الفوم المرن للراحة طوال اليوم",
        "متوفر بأربعة ألوان فاخرة",
      ],
    },
  ],
};

export const ProductDetails = () => {
  return (
    <div className="space-y-6 text-right">
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
