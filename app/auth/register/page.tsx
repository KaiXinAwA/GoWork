import { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register | GoWork",
  description: "Create your GoWork account",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            Create an Account
          </h1>
          <p className="text-muted-foreground">
            Enter your details below to create your account
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-lg shadow-sm border">
          <RegisterForm />
          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account? <Link href="/auth/login" className="text-primary hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}