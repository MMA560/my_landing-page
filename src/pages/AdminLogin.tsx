
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { HeaderAdmin } from "@/components/HeaderAdmin";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "اسم المستخدم يجب أن يكون على الأقل 3 أحرف",
  }),
  password: z.string().min(6, {
    message: "كلمة المرور يجب أن تكون على الأقل 6 أحرف",
  }),
});

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setTheme, theme } = useTheme();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (values.username === "admin" && values.password === "admin123") {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "جاري تحويلك للوحة التحكم",
        });
        
        // Save to localStorage
        localStorage.setItem("adminLoggedIn", "true");
        
        // Redirect to admin dashboard
        navigate("/admin");
      } else {
        toast({
          title: "خطأ في تسجيل الدخول",
          description: "اسم المستخدم أو كلمة المرور غير صحيحة",
          variant: "destructive",
        });
      }
    }, 1500);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      < HeaderAdmin />
      <div className="absolute top-4 left-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">تبديل المظهر</span>
        </Button>
      </div>
      
      <Card className="w-full max-w-md animate-fade-in shadow-lg" dir="rtl">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-admin flex items-center justify-center text-white text-3xl font-bold">
              إدارة
            </div>
          </div>
          <CardTitle className="text-2xl text-center">تسجيل الدخول للإدارة</CardTitle>
          <CardDescription className="text-center">
            أدخل بيانات الدخول للوصول للوحة التحكم
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المستخدم</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم المستخدم" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>كلمة المرور</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="أدخل كلمة المرور" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full " disabled={isLoading}>
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            جميع الحقوق محفوظة © {new Date().getFullYear()}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
