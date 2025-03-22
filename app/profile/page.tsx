'use client';

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface UserProfile {
  userid: string;
  username: string;
  email: string;
  resume?: string;
  education?: string;
  language?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, router]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-xl font-bold">User Profile</h1>
                <div className="flex gap-2">
                  <Link href="/profile/update">
                    <Button variant="default">
                      Update Profile
                    </Button>
                  </Link>
                  <Link href="/profile/password">
                    <Button variant="outline">
                      Change Password
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">USERNAME</p>
                    <p className="font-medium">{profile?.username || 'Not set'}</p>
                  </div>
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">EMAIL</p>
                    <p className="font-medium">{profile?.email || 'Not set'}</p>
                  </div>
                </div>

                <div>
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm">USER ID</p>
                    <p className="font-medium">{profile?.userid || 'Not set'}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 text-sm">RESUME</p>
                <div className="flex items-center mt-1">
                  {profile?.resume ? (
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 px-3 py-1 rounded text-sm">{profile.resume}</div>
                      <Link href={`/api/profile/resume/${profile.resume}`} target="_blank">
                        <Button variant="outline" size="sm">View</Button>
                      </Link>
                    </div>
                  ) : (
                    <p className="text-gray-500">No resume uploaded</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 text-sm">EDUCATION</p>
                <p className="font-medium">{profile?.education || 'Not set'}</p>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 text-sm">LANGUAGE</p>
                <p className="font-medium">{profile?.language || 'Not set'}</p>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow mt-8">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Password Management</h2>
            </div>
            <div className="p-6">
              <div className="flex flex-col gap-4">
                <p className="text-gray-600">
                  Want to change your password? Click the button below to update it.
                </p>
                <div className="flex gap-4">
                  <Link href="/profile/password">
                    <Button variant="default">
                      Change Password
                    </Button>
                  </Link>
                  <Link href="/auth/forgot-password">
                    <Button variant="outline">
                      Forgot Password?
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

