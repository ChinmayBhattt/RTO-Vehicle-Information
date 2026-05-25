'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Car, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Dynamic import to avoid build errors if next-auth isn't fully configured
      const { signIn } = await import('next-auth/react');
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        window.location.href = '/dashboard';
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { signIn } = await import('next-auth/react');
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch {
      setError('Google sign-in failed');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#111827] to-[#0d1117] px-4">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-violet-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Card */}
        <div className="rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-8 sm:p-10 shadow-[0_0_60px_rgba(0,0,0,0.3)]">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center mr-3">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">RTO Finder</h1>
              <p className="text-xs text-gray-500">Vehicle Information</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white text-center mb-2">Welcome back</h2>
          <p className="text-gray-500 text-center text-sm mb-8">
            Sign in to your account to continue
          </p>

          {/* Error */}
          {error && (
            <motion.div
              className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-600 text-sm outline-none focus:border-cyan-400/40 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full h-12 pl-11 pr-12 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-600 text-sm outline-none focus:border-cyan-400/40 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold text-sm hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-xs text-gray-600">Or continue with</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full h-12 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white font-medium text-sm hover:bg-white/[0.1] transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Signup link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
