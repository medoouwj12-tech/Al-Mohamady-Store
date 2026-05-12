'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Filter, Star, ChevronDown, SlidersHorizontal, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

const CATEGORIES = ['All', 'Accessories', 'Bags', 'Eyewear', 'Fragrance', 'Footwear'];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      let url = '/products';
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const keyword = urlParams.get('keyword');
        if (keyword) {
          url += `?keyword=${encodeURIComponent(keyword)}`;
        }
      }
      const response = await api.get(url);
      return response.data;
    }
  });

  const products = data?.products || [];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter((p: any) => p.category?.name === activeCategory);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-32 flex justify-center items-center">
        <Loader2 className="animate-spin text-luxury-gold" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-32 text-center text-red-500">
        Error loading products. Please make sure the backend server is running.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">Our <span className="text-gradient-gold">Collection</span></h1>
          <p className="text-luxury-muted">Explore our exclusive range of premium products.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="glass px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors">
            <SlidersHorizontal size={18} /> Filters
          </button>
          <button className="glass px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/10 transition-colors">
            Sort by: Featured <ChevronDown size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="hidden lg:block space-y-8">
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Filter size={18} /> Categories
            </h3>
            <div className="flex flex-col gap-3">
              {CATEGORIES.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-left text-sm transition-colors ${
                    activeCategory === category ? 'text-luxury-gold font-bold' : 'text-luxury-muted hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="glass-card p-6 rounded-2xl">
            <h3 className="font-semibold text-lg mb-4">Price Range</h3>
            <input type="range" className="w-full accent-luxury-gold mb-2" min="0" max="1000" />
            <div className="flex justify-between text-xs text-luxury-muted">
              <span>$0</span>
              <span>$1000+</span>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: any, index: number) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-luxury-gray">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full border border-white/10">
                      {product.category?.name || 'Category'}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link href={`/product/${product._id}`} className="bg-white text-black px-6 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-luxury-gold hover:text-white">
                      View Details
                    </Link>
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
                    </div>
                  </div>
                  <span className="font-bold text-lg text-luxury-gold">${product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="flex justify-center mt-12 gap-2">
            <button className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-luxury-gold hover:text-black transition-colors font-bold text-luxury-gold bg-white/10">1</button>
            <button className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-luxury-gold hover:text-black transition-colors">2</button>
            <button className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-luxury-gold hover:text-black transition-colors">3</button>
          </div>
        </div>
      </div>
    </div>
  );
}
