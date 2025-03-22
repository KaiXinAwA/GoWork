'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [canResendOTP, setCanResendOTP] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get email from URL if available
  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  // Handle countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResendOTP(true);
    }
  }, [countdown]);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!canResendOTP) return;

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('OTP sent successfully! Please check your email.');
        setError('');
        setStep(2);
        setCanResendOTP(false);
        setCountdown(60);
      } else {
        setError(data.error || 'Failed to send OTP');
        setMessage('');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setMessage('');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password reset successfully! Please login with your new password.');
        setError('');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.error || 'Failed to reset password');
        setMessage('');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">
            Reset Password
          </h1>
          <p className="text-muted-foreground">
            Enter your email to reset your password
          </p>
        </div>
        
        <div className="bg-card p-8 rounded-lg shadow-sm border">
          <form className="space-y-6" onSubmit={step === 1 ? handleSendOTP : handleResetPassword}>
            <div className="space-y-4">
              {step === 1 && (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              )}
              {step === 2 && (
                <>
                  <div className="text-sm text-muted-foreground">
                    Email: {email}
                  </div>
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                      OTP
                    </label>
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      maxLength="6"
                      pattern="[0-9]*"
                      required
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                    />
                    {error && error.includes('OTP') && (
                      <p className="mt-1 text-sm text-destructive">{error}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            {message && (
              <div className="text-sm text-green-600 text-center">{message}</div>
            )}
            {error && !error.includes('OTP') && (
              <div className="text-sm text-destructive text-center">{error}</div>
            )}

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="w-full flex justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {step === 1 ? 'Send OTP to Email' : 'Reset Password'}
              </button>
              
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={!canResendOTP}
                  className={`w-full flex justify-center rounded-md px-4 py-2 text-sm font-medium text-white ${
                    canResendOTP 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gray-400 cursor-not-allowed'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                >
                  {canResendOTP ? 'Resend OTP' : `Resend OTP in ${countdown}s`}
                </button>
              )}
            </div>
          </form>

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Remember your password? <Link href="/auth/login" className="text-primary hover:underline">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 