'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, CreditCard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-10 tracking-tighter">Secure <span className="text-gradient-gold">Checkout</span></h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-2 space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-luxury-gold text-black flex items-center justify-center text-sm">1</span> 
              Shipping Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="bg-black/50 border border-luxury-border rounded-xl py-3 px-4 focus:outline-none focus:border-luxury-gold transition-colors text-white" />
              <input type="text" placeholder="Last Name" className="bg-black/50 border border-luxury-border rounded-xl py-3 px-4 focus:outline-none focus:border-luxury-gold transition-colors text-white" />
              <input type="text" placeholder="Address" className="md:col-span-2 bg-black/50 border border-luxury-border rounded-xl py-3 px-4 focus:outline-none focus:border-luxury-gold transition-colors text-white" />
              <input type="text" placeholder="City" className="bg-black/50 border border-luxury-border rounded-xl py-3 px-4 focus:outline-none focus:border-luxury-gold transition-colors text-white" />
              <input type="text" placeholder="Postal Code" className="bg-black/50 border border-luxury-border rounded-xl py-3 px-4 focus:outline-none focus:border-luxury-gold transition-colors text-white" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 rounded-3xl"
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-luxury-gold text-black flex items-center justify-center text-sm">2</span> 
              Payment Method
            </h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 border border-luxury-gold bg-luxury-gold/5 rounded-xl cursor-pointer transition-colors">
                <input type="radio" name="payment" className="accent-luxury-gold w-5 h-5" defaultChecked />
                <div className="flex-1">
                  <div className="font-bold">Credit Card (Stripe)</div>
                  <div className="text-luxury-muted text-sm">Secure online payment</div>
                </div>
                <CreditCard className="text-luxury-gold" />
              </label>

              <label className="flex items-center gap-4 p-4 border border-luxury-border rounded-xl cursor-pointer hover:border-luxury-gold/50 transition-colors">
                <input type="radio" name="payment" className="accent-luxury-gold w-5 h-5" />
                <div className="flex-1">
                  <div className="font-bold">Cash on Delivery</div>
                  <div className="text-luxury-muted text-sm">Pay when you receive</div>
                </div>
              </label>
            </div>
          </motion.div>

        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 rounded-3xl sticky top-28"
          >
            <h2 className="text-2xl font-bold mb-6">Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-luxury-gray overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm">Chronograph Luxury Watch</div>
                  <div className="text-luxury-muted text-xs">Qty: 1</div>
                </div>
                <div className="font-bold">$499.99</div>
              </div>
            </div>

            <div className="h-[1px] bg-luxury-border w-full mb-6"></div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-luxury-muted">
                <span>Subtotal</span>
                <span className="text-white">$499.99</span>
              </div>
              <div className="flex justify-between text-luxury-muted">
                <span>Estimated Tax</span>
                <span className="text-white">$70.00</span>
              </div>
              <div className="flex justify-between text-luxury-muted">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
            </div>

            <div className="h-[1px] bg-luxury-border w-full mb-6"></div>

            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-bold">Total</span>
              <span className="text-2xl font-bold text-luxury-gold">$569.99</span>
            </div>

            <button className="w-full bg-luxury-gold text-black h-14 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              Place Order <ArrowRight size={20} />
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-luxury-muted">
              <ShieldCheck size={16} className="text-green-500" />
              <span>Payments are secure and encrypted</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
