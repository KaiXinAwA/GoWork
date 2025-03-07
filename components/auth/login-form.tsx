import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email("无效的邮箱地址 / Invalid email address"),
  password: z.string().min(6, "密码至少需要6个字符 / Password must be at least 6 characters"),
});

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "登录失败 / Login failed");
      }

      // 保存token到localStorage以便前端使用
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      toast.success("登录成功! / Login successful!");

      // 根据用户角色重定向
      if (data.role === "EMPLOYER") {
        router.push("/employer/dashboard");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch (error) {
      console.error("登录错误 / Login error:", error);
      toast.error(error instanceof Error ? error.message : "邮箱或密码错误 / Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱 / Email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="请输入邮箱 / Enter your email" 
                  type="email"
                  disabled={isLoading}
                  {...field} 
                />
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
              <FormLabel>密码 / Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="请输入密码 / Enter your password"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between text-sm">
          <Link 
            href="/auth/register" 
            className="text-blue-600 hover:underline"
          >
            注册账号 / Create Account
          </Link>
          <Link 
            href="/auth/forgot-password" 
            className="text-blue-600 hover:underline"
          >
            忘记密码？/ Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            "登录中... / Logging in..."
          ) : (
            "登录 / Login"
          )}
        </Button>
      </form>
    </Form>
  );
}