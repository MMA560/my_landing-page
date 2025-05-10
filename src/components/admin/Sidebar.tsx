
import { Link, useLocation } from "react-router-dom";
import { Package } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="w-64 h-full border-l bg-sidebar flex flex-col overflow-y-auto" dir="rtl">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/admin" className="flex items-center gap-2">
          <Package className="h-5 w-5 text-admin" />
          <span className="font-bold">لوحة التحكم</span>
        </Link>
      </div>
      <nav className="flex-1 px-2 py-4">
        <div className="space-y-1">
          <Link
            to="/admin/orders"
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
              isActive("/admin/orders")
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <Package className="h-5 w-5 flex-shrink-0" />
            <span>الطلبات</span>
          </Link>
        </div>
      </nav>
      <div className="mt-auto border-t p-4">
        <div className="text-sm text-muted-foreground">
          <div className="font-medium">لوحة إدارة المتجر</div>
          <div className="mt-1 text-xs">الإصدار 1.0.0</div>
        </div>
      </div>
    </div>
  );
}
