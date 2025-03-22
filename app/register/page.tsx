'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!username || !email || !password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    try {
      await register(username, email, password);
      router.push('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-md shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-xl font-bold text-center mb-6">CREATE ACCOUNT</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                USERNAME
              </label>
              <input
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                EMAIL
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mt-2 disabled:bg-blue-400"
              disabled={loading}
            >
              {loading ? 'REGISTERING...' : 'REGISTER'}
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

