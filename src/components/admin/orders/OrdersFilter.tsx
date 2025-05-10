// src/components/admin/orders/OrdersFilter.tsx

import { OrderStatus, orderStatusArabic } from "@/types/order"; // التأكد من استيراد الأنواع من ملفك الموحد
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, Search, ChevronDown, Mail } from "lucide-react";

interface OrdersFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: OrderStatus | "all";
  setStatusFilter: (status: OrderStatus | "all") => void;
  isReadFilter: "all" | "unread" | "read"; // فلتر حالة القراءة
  setIsReadFilter: (status: "all" | "unread" | "read") => void;
}

export function OrdersFilter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  isReadFilter,
  setIsReadFilter
}: OrdersFilterProps) {
  return (
    <Card className="md:col-span-12">
      <CardHeader className="p-4">
        <CardTitle className="text-lg">البحث والفلترة</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="بحث بالإسم أو رقم الهاتف أو رقم الطلب"
              className="pr-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* فلتر حالة الطلب */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1 min-w-28">
                <Filter className="h-4 w-4" />
                <span>الحالة: </span>
                <span>
                  {statusFilter === "all"
                    ? "الكل"
                    : orderStatusArabic[statusFilter]}
                </span>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                الكل
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                {orderStatusArabic["pending"]}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>
                {orderStatusArabic["confirmed"]}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("delivering")}>
                {orderStatusArabic["delivering"]}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("delivered")}>
                {orderStatusArabic["delivered"]}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("canceled")}>
                {orderStatusArabic["canceled"]}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* فلتر حالة القراءة */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1 min-w-28">
                <Mail className="h-4 w-4" />
                <span>القراءة: </span>
                <span>
                  {isReadFilter === "all"
                    ? "الكل"
                    : isReadFilter === "unread"
                    ? "غير مقروء"
                    : "مقروء"}
                </span>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsReadFilter("all")}>
                الكل
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsReadFilter("unread")}>
                غير مقروء
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsReadFilter("read")}>
                مقروء
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}