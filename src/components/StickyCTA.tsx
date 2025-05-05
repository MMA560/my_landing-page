import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type StickyCTAProps = {
  scrollToOrderForm: () => void;
};

export const StickyCTA: React.FC<StickyCTAProps> = ({ scrollToOrderForm }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = window.innerHeight * 0.5;
      
      setVisible(scrollPosition > threshold);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border py-2 px-3 transition-transform duration-300 z-40 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <p className="font-medium">أطلب دلوقتي</p>
          <p className="text-lg font-bold" dir="rtl">490 جنيه</p>
        </div>
        <Button 
          onClick={scrollToOrderForm}
          className="bg-gold hover:bg-gold/90 text-white text-xs py-1 px-3"
        >
          Order Now
        </Button>
      </div>
    </div>
  );
};
