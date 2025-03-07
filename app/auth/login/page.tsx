import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "登录 / Login",
  description: "登录到您的账户 / Login to your account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            Welcome Back
            <span className="chinese block mt-1">欢迎回来</span>
          </h1>
          <p className="text-muted-foreground">
            Login to your account to continue
            <span className="chinese block mt-1">登录您的账户以继续</span>
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-lg shadow-sm border">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}