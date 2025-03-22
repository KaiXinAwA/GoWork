import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | GoWork",
  description: "Login to your GoWork account",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 