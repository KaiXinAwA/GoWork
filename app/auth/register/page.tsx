import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "注册 / Register",
  description: "创建您的账户 / Create your account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            Create an Account
            <span className="chinese block mt-1">创建账户</span>
          </h1>
          <p className="text-muted-foreground">
            Enter your details below to create your account
            <span className="chinese block mt-1">请填写以下信息创建您的账户</span>
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-lg shadow-sm border">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}