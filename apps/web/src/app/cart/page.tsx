'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const { items, removeFromCart, increaseQty, decreaseQty } = useCartStore();

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.14;
  const total = subtotal + tax;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center justify-center">
        <div className="w-32 h-32 bg-luxury-gray rounded-full flex items-center justify-center mb-6 border border-luxury-border">
          <Trash2 size={48} className="text-luxury-muted" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-luxury-muted mb-8 text-center max-w-md">Looks like you haven't added any luxury items to your cart yet.</p>
        <Link href="/shop" className="bg-luxury-gold text-black px-8 py-3 rounded-full font-bold hover:bg-yellow-500 transition-colors">
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 tracking-tighter">Your <span className="text-gradient-gold">Shopping Cart</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col sm:flex-row items-center gap-6 p-4 glass-card rounded-2xl"
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-luxury-gray">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 text-center sm:text-left">
                <Link href={`/product/${item.id}`} className="text-lg font-bold hover:text-luxury-gold transition-colors">{item.name}</Link>
                <div className="text-luxury-gold font-bold mt-1">${item.price}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center bg-luxury-black rounded-full px-3 py-1 border border-luxury-border">
                  <button onClick={() => decreaseQty(item.id)} className="p-1 hover:text-luxury-gold text-gray-400"><Minus size={14} /></button>
                  <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)} className="p-1 hover:text-luxury-gold text-gray-400"><Plus size={14} /></button>
                </div>
                
                <button onClick={() => removeFromCart(item.id)} className="text-luxury-muted hover:text-red-500 transition-colors p-2 glass rounded-full">
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
          
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-luxury-border">
            <Link href="/shop" className="text-luxury-muted hover:text-white transition-colors text-sm font-medium underline underline-offset-4">
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card p-8 rounded-3xl sticky top-28">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-luxury-muted">
                <span>Subtotal</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-luxury-muted">
                <span>Estimated Tax</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-luxury-muted">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
            </div>

            <div className="h-[1px] bg-luxury-border w-full mb-6"></div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-bold text-luxury-gold">${total.toFixed(2)}</span>
            </div>

            <Link href="/checkout" className="w-full bg-luxury-gold text-black h-14 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              Proceed to Checkout <ArrowRight size={20} />
            </Link>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-luxury-muted">
              <span>Secure checkout powered by Stripe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

