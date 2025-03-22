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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Reset Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={step === 1 ? handleSendOTP : handleResetPassword}>
          <div className="rounded-md shadow-sm -space-y-px">
            {step === 1 && (
              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            {step === 2 && (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Email: {email}</p>
                </div>
                <div>
                  <label htmlFor="otp" className="sr-only">
                    OTP
                  </label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    maxLength="6"
                    pattern="[0-9]*"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                  {error && error.includes('OTP') && (
                    <p className="text-red-500 text-xs mt-1">{error}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="newPassword" className="sr-only">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>

          {message && (
            <div className="text-green-600 text-sm text-center">{message}</div>
          )}
          {error && !error.includes('OTP') && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {step === 1 ? 'Send OTP to Email' : 'Reset Password'}
            </button>
            
            {step === 2 && (
              <button
                type="button"
                onClick={handleSendOTP}
                disabled={!canResendOTP}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  canResendOTP 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-400 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
              >
                {canResendOTP ? 'Resend OTP' : `Resend OTP in ${countdown}s`}
              </button>
            )}
          </div>
        </form>

        <div className="text-sm text-center">
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
} 