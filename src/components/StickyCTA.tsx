// --- StickyCTA Component (Updated) ---
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Assuming you have a utility for conditional class names

type StickyCTAProps = {
  scrollToOrderForm: () => void;
  currentPrice: number; // Add current price
  isOrderDisabled: boolean; // Add disabled state
  isLoading: boolean; // Add loading state for button text
};

export const StickyCTA: React.FC<StickyCTAProps> = ({
  scrollToOrderForm,
  currentPrice, // Destructure new props
  isOrderDisabled,
  isLoading,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust this threshold if needed, e.g., based on a specific element's position
      const threshold = window.innerHeight * 0.5; 
      
      // Only show if not at the very top and below the threshold
      setVisible(scrollPosition > threshold);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Add a check to not render if the component should be hidden (e.g., on desktop)
  // and also not show while price/loading state is not ready.
  // Although the parent handles the main loading state, checking `currentPrice` > 0
  // or similar might be useful here if the parent didn't handle it globally.
  // Given the parent structure, it's safe to assume product is loaded if Index renders StickyCTA.

  return (
    <div 
      className={cn(
          "fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border py-2 px-3 transition-transform duration-300 z-40 md:hidden",
        visible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4"> {/* Added container and px-4 for consistent padding */}
        <div className="text-sm">
          <p className="font-medium">أطلب دلوقتي</p>
          {/* Use the dynamic price */}
          <p className="text-lg font-bold" dir="rtl">جنيه مصري {currentPrice.toFixed(2)}</p> 
        </div>
        <Button 
          onClick={scrollToOrderForm}
          className="bg-gold hover:bg-gold/90 text-white text-xs py-1 px-3"
          disabled={isOrderDisabled || isLoading} // Use the dynamic disabled state and loading state
        >
          {isLoading ? 'جاري التحميل...' : 'تقديم طلب'} {/* Show loading text when needed */}
        </Button>
      </div>
    </div>
  );
}