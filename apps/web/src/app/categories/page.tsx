'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CATEGORIES_DATA = [
  { id: 1, name: 'Premium Accessories', description: 'Watches, Rings & Bracelets', image: 'https://images.unsplash.com/photo-1599643477874-c483a90327f9?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Luxury Bags', description: 'Designer Leather & Travel', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'Fine Fragrances', description: 'Oud & Signature Perfumes', image: 'https://images.unsplash.com/photo-1594035910387-fea47724263f?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Designer Eyewear', description: 'Sunglasses & Optics', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'Elegant Footwear', description: 'Classic Shoes & Sneakers', image: 'https://images.unsplash.com/photo-1614252235314-8c037803309a?q=80&w=800&auto=format&fit=crop' },
  { id: 6, name: 'Apparel', description: 'Exclusive Clothing Collections', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop' },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">Explore <span className="text-gradient-gold">Categories</span></h1>
        <p className="text-luxury-muted text-lg">Browse our exclusive collections meticulously categorized to help you find the perfect luxury items.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORIES_DATA.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-0 bg-luxury-gray">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-luxury-gold transition-colors">{category.name}</h2>
              <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                {category.description}
              </p>
              
              <Link href={`/shop?category=${category.name.split(' ')[1] || category.name}`} className="inline-flex items-center gap-2 text-luxury-gold font-semibold uppercase tracking-wider text-sm hover:text-yellow-400 w-fit">
                Shop Now <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
