'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Star } from 'lucide-react';

const DUMMY_PRODUCTS = [
  { id: 1, name: 'Chronograph Watch', price: 499.99, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=600&auto=format&fit=crop' },
  { id: 2, name: 'Leather Messenger', price: 299.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop' },
  { id: 3, name: 'Silk Aviator', price: 159.99, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=600&auto=format&fit=crop' },
  { id: 4, name: 'Oud Perfume', price: 199.99, image: 'https://images.unsplash.com/photo-1594035910387-fea47724263f?q=80&w=600&auto=format&fit=crop' },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-luxury-blue/20 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 z-10 text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl"
          >
            Discover True <span className="text-gradient-gold">Elegance</span> & Luxury
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-luxury-muted max-w-2xl mb-10"
          >
            Curated collections of the finest premium goods from around the globe. Redefine your style with Al-Mohamady Commerce.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link 
              href="/shop" 
              className="bg-luxury-gold text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-all flex items-center justify-center gap-2"
            >
              Shop Collection <ArrowRight size={20} />
            </Link>
            <Link 
              href="/categories" 
              className="glass px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
            >
              Explore Categories
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
            <p className="text-luxury-muted">Handpicked premium items for you.</p>
          </div>
          <Link href="/shop" className="hidden md:flex text-luxury-gold hover:text-yellow-400 items-center gap-1 font-medium transition-colors">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DUMMY_PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-luxury-gray">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-black px-6 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    Quick View
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg text-white group-hover:text-luxury-gold transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs text-luxury-muted ml-1">(120)</span>
                  </div>
                </div>
                <span className="font-bold text-lg">${product.price}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Value Section */}
      <section className="container mx-auto px-4 mt-12">
        <div className="glass-card rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/10 rounded-full blur-[80px]" />
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6 relative z-10">
            Crafted for <span className="text-gradient-gold">Perfection</span>
          </h2>
          <p className="text-luxury-muted text-lg max-w-2xl mx-auto mb-10 relative z-10">
            We believe that true luxury lies in the details. Every product on our platform is thoroughly vetted to ensure the highest standards of quality, design, and craftsmanship.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mt-16">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-luxury-gold/10 flex items-center justify-center mb-4 text-luxury-gold">
                <Star size={28} />
              </div>
              <h3 className="font-semibold text-xl mb-2">Premium Quality</h3>
              <p className="text-luxury-muted text-center text-sm">Sourced from the world's finest artisans and luxury brands.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-luxury-blue/10 flex items-center justify-center mb-4 text-luxury-blue">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Secure Payment</h3>
              <p className="text-luxury-muted text-center text-sm">Your transactions are protected by industry-leading encryption.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              </div>
              <h3 className="font-semibold text-xl mb-2">Express Shipping</h3>
              <p className="text-luxury-muted text-center text-sm">Fast, reliable, and secure worldwide delivery options.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
