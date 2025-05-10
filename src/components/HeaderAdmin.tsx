import { ShoppingCart, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

export const HeaderAdmin = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="font-serif text-xl font-medium">لوحة تحكم المسئول</div>
        </div>

        <div className="flex items-center space-x-1">
          <ThemeToggle />

          <div className="relative"></div>
        </div>
      </div>
    </header>
  );
};
