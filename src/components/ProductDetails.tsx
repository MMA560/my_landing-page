export const ProductDetails = () => {
  return (
    <div className="space-y-6 text-right">
      <h3 className="text-xl font-serif text-center">تفاصيل المنتج</h3>
      
      <div className="space-y-4">
        <p className="text-muted-foreground">
          يمثل حذاء "ميترو أوكسفورد" قمة تصميم الأحذية الحديثة الممزوجة بالحرفية التقليدية. يتم تصنيع كل زوج بعناية فائقة من جلد طبيعي كامل الحبة، تم اختياره يدويًا لجودته العالية ومتانته.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3">
            <h4 className="font-medium">المواد وطريقة التصنيع</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2 justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 order-last"></span>
                <span>سطح علوي من جلد طبيعي كامل الحبة عالي الجودة</span>
              </li>
              <li className="flex items-start gap-2 justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 order-last"></span>
                <span>تصميم مخيط بطريقة Goodyear لمتانة وسهولة إعادة التبطين</span>
              </li>
              <li className="flex items-start gap-2 justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 order-last"></span>
                <span>بطانة كاملة من الجلد للراحة والتهوية</span>
              </li>
              <li className="flex items-start gap-2 justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 order-last"></span>
                <span>نعل داخلي مملوء بالفلين يتشكل حسب شكل القدم</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">الميزات والفوائد</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2 justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 order-last"></span>
                <span>تصميم متعدد الاستخدامات يناسب المناسبات الرسمية والعملية</span>
              </li>
              <li className="flex items-start gap-2 justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 order-last"></span>
                <span>كعب معزز لمزيد من الثبات</span>
              </li>
              <li className="flex items-start gap-2 justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 order-last"></span>
                <span>بطانة من الفوم المرن للراحة طوال اليوم</span>
              </li>
              <li className="flex items-start gap-2 justify-end">
                <span className="h-1.5 w-1.5 rounded-full bg-gold mt-1.5 order-last"></span>
                <span>متوفر بأربعة ألوان فاخرة</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
