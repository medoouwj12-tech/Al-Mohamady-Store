'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Star, Minus, Plus, ShoppingCart, Heart, ShieldCheck, Truck, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useCartStore } from '@/store/cartStore';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCartStore();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data.product;
    }
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-32 flex justify-center items-center">
        <Loader2 className="animate-spin text-luxury-gold" size={48} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center text-red-500">
        Product not found.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Product Images/Video Gallery */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square bg-luxury-gray rounded-3xl overflow-hidden border border-luxury-border relative"
          >
            {activeImage === -1 ? (
              <video 
                src={product.video} 
                controls 
                autoPlay 
                loop 
                muted 
                className="w-full h-full object-cover"
              />
            ) : (
              <img src={product.images[activeImage]} alt={product.name} className="w-full h-full object-cover" />
            )}
          </motion.div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img: string, idx: number) => (
              <button 
                key={idx} 
                onClick={() => setActiveImage(idx)}
                className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${activeImage === idx ? 'border-luxury-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
            {product.video && (
              <button 
                onClick={() => setActiveImage(-1)}
                className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 relative flex items-center justify-center bg-black ${activeImage === -1 ? 'border-luxury-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <div className="absolute inset-0 bg-luxury-gray opacity-50"></div>
                <span className="relative z-10 text-white font-bold text-xs uppercase tracking-widest flex flex-col items-center gap-1">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    ▶
                  </div>
                  Video
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <div className="mb-2">
            <span className="text-luxury-gold text-sm font-bold tracking-widest uppercase">{product.brand}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-500">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
            <span className="text-luxury-muted text-sm">({product.numReviews || 0} customer reviews)</span>
          </div>

          <div className="text-3xl font-bold mb-8">${product.price}</div>
          
          <p className="text-luxury-muted text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Features */}
          <ul className="space-y-2 mb-8">
            {['100% Authentic', 'Premium Materials', 'Fast Shipping'].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold" /> {feature}
              </li>
            ))}
          </ul>

          <div className="h-[1px] bg-luxury-border w-full mb-8"></div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center bg-luxury-gray rounded-full px-4 h-14 border border-luxury-border w-fit">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:text-luxury-gold text-gray-400"><Minus size={18} /></button>
              <span className="w-12 text-center font-bold text-lg">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-2 hover:text-luxury-gold text-gray-400"><Plus size={18} /></button>
            </div>
            
            <button 
              onClick={() => addToCart({
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                qty: qty
              })}
              className="flex-1 bg-luxury-gold text-black h-14 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <ShoppingCart size={22} /> Add to Cart
            </button>
            
            <button className="w-14 h-14 rounded-full glass flex items-center justify-center hover:text-red-500 transition-colors">
              <Heart size={22} />
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="flex items-center gap-3 p-4 glass-card rounded-2xl">
              <ShieldCheck className="text-luxury-gold" size={24} />
              <div className="text-sm font-medium">2 Year Warranty<br/><span className="text-luxury-muted text-xs">100% Authentic</span></div>
            </div>
            <div className="flex items-center gap-3 p-4 glass-card rounded-2xl">
              <Truck className="text-luxury-gold" size={24} />
              <div className="text-sm font-medium">Free Shipping<br/><span className="text-luxury-muted text-xs">Orders over $200</span></div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
