
import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, Package, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "../Header";
import { HeaderAdmin } from "../HeaderAdmin";

export default function AdminLayout() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    setIsMounted(true);
    const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/admin/login");
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    toast({
      title: "تم تسجيل الخروج بنجاح",
      description: "نتمنى لك يوما سعيدا"
    });
    navigate("/admin/login");
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background" dir="rtl">
      <HeaderAdmin />
      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {isMobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </>
                )}
              </svg>
              <span className="sr-only">القائمة</span>
            </Button>

            {/* Logo */}
            <Link to="/admin" className="flex items-center gap-2">
              <Package className="h-6 w-6 text-admin" />
              <span className="text-lg font-bold">لوحة التحكم</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/*
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">تبديل المظهر</span>
            </Button>
            */}

            {/* Logout Button */}
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">تسجيل الخروج</span>
            </Button>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Mobile Sidebar */}
        <div
          className={`md:hidden fixed inset-y-0 right-0 z-50 w-64 bg-background transition-transform transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b">
              <span className="font-bold text-lg">القائمة</span>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                <span className="sr-only">إغلاق</span>
              </Button>
            </div>
            <Sidebar />
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
