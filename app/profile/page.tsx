'use client';

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import "./styles.css"

interface UserProfile {
  userid: number;
  username: string;
  email: string;
  resume: string | null;
  education: string | null;
  language: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading: authLoading, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        await refreshUser();
      } catch (error) {
        console.error('Failed to load user data:', error);
        toast.error('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [refreshUser]);

  // Show loading state while checking authentication
  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="profile-loading">
          <div className="profile-loading-spinner"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-gray-50">
        <div className="profile-container">
          <div className="profile-card">
            <div className="profile-header">
              <div className="profile-actions">
                <h1 className="profile-title">User Profile</h1>
                <div className="flex gap-2">
                  <Link href="/profile/update">
                    <Button className="profile-button profile-button-primary">
                      Update Profile
                    </Button>
                  </Link>
                  <Link href="/profile/password">
                    <Button className="profile-button profile-button-secondary">
                      Change Password
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="profile-content">
              <div className="profile-grid">
                <div>
                  <div className="profile-field">
                    <p className="profile-label">USERNAME</p>
                    <p className="profile-value">{user?.username || 'Not set'}</p>
                  </div>
                  <div className="profile-field">
                    <p className="profile-label">EMAIL</p>
                    <p className="profile-value">{user?.email || 'Not set'}</p>
                  </div>
                </div>

                <div>
                  <div className="profile-field">
                    <p className="profile-label">USER ID</p>
                    <p className="profile-value">{user?.userid || 'Not set'}</p>
                  </div>
                </div>
              </div>

              <div className="profile-field">
                <p className="profile-label">RESUME</p>
                <div className="profile-resume">
                  {user?.resume ? (
                    <>
                      <span className="profile-resume-name">{user.resume}</span>
                      <Link href={`/api/profile/resume/${user.resume}`} target="_blank" className="profile-resume-button">
                        View
                      </Link>
                    </>
                  ) : (
                    <span className="text-gray-500">No resume uploaded</span>
                  )}
                </div>
              </div>

              <div className="profile-field">
                <p className="profile-label">EDUCATION</p>
                <p className="profile-value">{user?.education || 'No education information added yet'}</p>
              </div>

              <div className="profile-field">
                <p className="profile-label">LANGUAGE</p>
                <p className="profile-value">{user?.language || 'No language information added yet'}</p>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="profile-section">
            <div className="profile-section-content">
              <h2 className="profile-section-title">Password Management</h2>
              <div className="profile-content">
                <p className="text-gray-600 mb-4">
                  Want to change your password? Click the button below to update it.
                </p>
                <div className="flex gap-4">
                  <Link href="/profile/password">
                    <Button className="profile-button profile-button-primary">
                      Change Password
                    </Button>
                  </Link>
                  <Link href="/auth/forgot-password">
                    <Button className="profile-button profile-button-secondary">
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

