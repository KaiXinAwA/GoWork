import { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | GoWork",
  description: "Login to your GoWork account",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Login to your account to continue
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-lg shadow-sm border">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}