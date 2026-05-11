'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const { items } = useCartStore();

  const cartItemCount = items.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    setMounted(true);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gradient-gold tracking-tighter">
            AL-MOHAMADY
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-luxury-gold transition-colors">Home</Link>
            <Link href="/shop" className="text-sm font-medium hover:text-luxury-gold transition-colors">Shop</Link>
            <Link href="/categories" className="text-sm font-medium hover:text-luxury-gold transition-colors">Categories</Link>
            <Link href="/about" className="text-sm font-medium hover:text-luxury-gold transition-colors">About</Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-5">
            <button className="text-gray-300 hover:text-luxury-gold transition-colors">
              <Search size={20} />
            </button>
            <Link href="/cart" className="relative text-gray-300 hover:text-luxury-gold transition-colors">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-luxury-gold text-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {mounted ? cartItemCount : 0}
              </span>
            </Link>
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-sm font-medium text-gray-300 hover:text-white">
                  {user?.name}
                </Link>
                <button onClick={logout} className="text-sm font-medium text-red-400 hover:text-red-300">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-gray-300 hover:text-luxury-gold transition-colors">
                <User size={20} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card mt-4 mx-4 rounded-xl overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-4">
              <Link href="/" className="block text-lg font-medium hover:text-luxury-gold">Home</Link>
              <Link href="/shop" className="block text-lg font-medium hover:text-luxury-gold">Shop</Link>
              <Link href="/categories" className="block text-lg font-medium hover:text-luxury-gold">Categories</Link>
              
              <div className="h-[1px] bg-white/10 w-full my-2"></div>
              
              <div className="flex items-center justify-between">
                <Link href="/cart" className="flex items-center gap-2 text-lg font-medium hover:text-luxury-gold">
                  <ShoppingCart size={20} /> Cart ({mounted ? cartItemCount : 0})
                </Link>
                {isAuthenticated ? (
                  <button onClick={logout} className="text-red-400">Logout</button>
                ) : (
                  <Link href="/login" className="flex items-center gap-2 text-lg font-medium hover:text-luxury-gold">
                    <User size={20} /> Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
