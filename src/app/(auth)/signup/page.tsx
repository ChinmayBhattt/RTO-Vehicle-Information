'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, User, Car, ArrowRight, Check } from 'lucide-react';

function getPasswordStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 1) return { score, label: 'Weak', color: 'bg-red-500' };
  if (score === 2) return { score, label: 'Fair', color: 'bg-amber-500' };
  if (score === 3) return { score, label: 'Good', color: 'bg-yellow-400' };
  return { score, label: 'Strong', color: 'bg-emerald-500' };
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      setError('Please agree to the Terms of Service');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      router.push('/login?registered=true');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0a1a] via-[#111827] to-[#0d1117] px-4 py-12">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-72 h-72 bg-violet-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/3 -left-20 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
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

          <h2 className="text-2xl font-bold text-white text-center mb-2">Create an account</h2>
          <p className="text-gray-500 text-center text-sm mb-8">
            Join thousands of users across India
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
            {/* Name */}
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="John Doe"
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-600 text-sm outline-none focus:border-cyan-400/40 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all"
                />
              </div>
            </div>

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
                  minLength={8}
                  placeholder="Min. 8 characters"
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

              {/* Password strength */}
              {password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          i < strength.score ? strength.color : 'bg-white/[0.08]'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${strength.color.replace('bg-', 'text-')}`}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2 font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter password"
                  className="w-full h-12 pl-11 pr-12 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white placeholder-gray-600 text-sm outline-none focus:border-cyan-400/40 focus:shadow-[0_0_20px_rgba(6,182,212,0.1)] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors cursor-pointer"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-400 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className="relative mt-0.5">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 rounded-md border border-white/[0.15] bg-white/[0.05] peer-checked:bg-gradient-to-br peer-checked:from-cyan-400 peer-checked:to-violet-500 peer-checked:border-transparent transition-all flex items-center justify-center">
                  {agreedToTerms && <Check className="w-3 h-3 text-white" />}
                </div>
              </div>
              <span className="text-sm text-gray-500 leading-tight">
                I agree to the{' '}
                <Link href="/terms" className="text-cyan-400 hover:text-cyan-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300">
                  Privacy Policy
                </Link>
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || !agreedToTerms}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold text-sm hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
