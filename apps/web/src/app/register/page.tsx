'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Register Logic
  };

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-card p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-luxury-blue/20 rounded-full blur-[60px]" />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2 text-center">Join Al-Mohamady</h1>
            <p className="text-luxury-muted text-center mb-8">Create your premium account</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User size={18} className="text-luxury-muted" />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black/50 border border-luxury-border rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-luxury-gold transition-colors text-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

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
                <label className="block text-sm font-medium mb-2">Password</label>
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
                    placeholder="Create a password"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mt-4"
              >
                Create Account <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-luxury-muted">
              Already have an account?{' '}
              <Link href="/login" className="text-white hover:text-luxury-gold font-bold transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
