import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import OrdersManagement from "./pages/admin/OrdersManagement";
import { Policies } from "./pages/Policies";
import { AboutUs } from "./pages/AboutUs";
import { SizingGuide } from "./pages/SizingGuide";
import { CareInstructions } from "./pages/CareInstructions";
import { WhatsAppButton } from "./components/whatsAppButton";
import { CookiesProvider } from "react-cookie"; // استيراد CookiesProvider
import FavoritesPage from "./pages/FavoritePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CookiesProvider>
          {" "}
          {/* لف الـ BrowserRouter بـ CookiesProvider */}
          <Routes>
            {/* إعادة توجيه من المسار الأساسي إلى صفحة المنتج (مع الـ ID الوهمي 1) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            {/* مسار صفحة المنتج الجديد */}
            <Route path="/products/:productId" element={<Index />} />

            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/sizing-guide" element={<SizingGuide />} />
            <Route path="/care-instructions" element={<CareInstructions />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<OrdersManagement />} />
              <Route path="orders" element={<OrdersManagement />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CookiesProvider>
      </BrowserRouter>
      <WhatsAppButton
        phoneNumber="+20159915404"
        message="Hello! I'm interested shoes ."
      />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
