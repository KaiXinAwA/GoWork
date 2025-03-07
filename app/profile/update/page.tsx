'use client';

import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import React from "react";
import { useErrorHandler } from "@/hooks/use-error-handler";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { handleError } = useErrorHandler({
    defaultMessage: '更新个人资料失败'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('更新个人资料失败');
      }
      
      toast.success('个人资料已更新');
      router.push('/profile');
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h1 className="text-xl font-bold">Update User Profile</h1>
            </div>

            <div className="p-6">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* 表单内容保持不变 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">UPDATE USERNAME</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue="KaiXin"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">UPDATE EMAIL</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      defaultValue="KaiXin3111@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">UPDATE RESUME</label>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 px-3 py-2 rounded text-sm flex-grow">[resume.pdf]</div>
                    <button type="button" className="px-3 py-2 bg-gray-200 rounded text-sm">
                      Choose File
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">UPDATE EDUCATION</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="University"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">UPDATE LANGUAGE</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    defaultValue="Chinese, English, Bahasa Melayu"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Link href="/profile">
                    <button type="button" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                      Cancel
                    </button>
                  </Link>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

