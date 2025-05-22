import { ShoppingCart, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom"; // استيراد useNavigate

export const Header = () => {
  const navigate = useNavigate(); // استخدام هوك useNavigate

  const goToFavorites = () => {
    navigate("/favorites"); // دالة للتوجيه إلى صفحة المفضلة
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="font-serif text-xl font-medium">
            Rush Kicks
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <ThemeToggle />

          {/*<Button variant="ghost" size="icon" aria-label="Account">
            <User className="h-5 w-5" />
          </Button>*/}

          <Button variant="ghost" size="icon" aria-label="Wishlist" onClick={goToFavorites}> {/* استخدام onClick مع دالة التوجيه */}
            <Heart className="h-5 w-5" />
          </Button>

          {/*<div className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-gold text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                2
              </span>
            </Button>
          </div>*/}
        </div>
      </div>
    </header>
  );
};