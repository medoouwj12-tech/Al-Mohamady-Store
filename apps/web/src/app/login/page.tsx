'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, Loader2 } from 'lucide-react';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setCredentials } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setCredentials(data.user, data.token);
      if (data.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-luxury-gold/20 rounded-full blur-[60px]" />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
            <p className="text-luxury-muted text-center mb-8">Sign in to your luxury account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail size={18} className="text-luxury-muted" />
                  </div>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-luxury-border rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-luxury-gold transition-colors text-white"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Password</label>
                  <Link href="/forgot-password" className="text-xs text-luxury-gold hover:text-yellow-400">Forgot Password?</Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock size={18} className="text-luxury-muted" />
                  </div>
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/50 border border-luxury-border rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-luxury-gold transition-colors text-white"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-luxury-gold text-black py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <></>}
                {isLoading ? 'Signing In...' : 'Sign In'} {!isLoading && <ArrowRight size={20} />}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-luxury-muted">
              Don't have an account?{' '}
              <Link href="/register" className="text-luxury-gold hover:text-yellow-400 font-bold">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
