'use client';

import { motion } from 'framer-motion';
import { Star, ShieldCheck, Globe, Trophy } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tighter mb-6"
        >
          Redefining <span className="text-gradient-gold">Luxury</span> E-Commerce
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-luxury-muted text-lg md:text-xl leading-relaxed"
        >
          Al-Mohamady Commerce was founded with a singular vision: to provide the most seamless, premium, and reliable platform for acquiring the world's finest luxury goods. We bridge the gap between elite craftsmanship and global accessibility.
        </motion.p>
      </section>

      {/* Image Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="h-[500px] rounded-3xl overflow-hidden bg-luxury-gray"
        >
          <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Fashion" />
        </motion.div>
        <div className="flex flex-col gap-8">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[234px] rounded-3xl overflow-hidden bg-luxury-gray"
          >
            <img src="https://images.unsplash.com/photo-1599643477874-c483a90327f9?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover" alt="Watches" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="h-[234px] rounded-3xl overflow-hidden bg-luxury-gray flex items-center justify-center p-8 text-center glass-card"
          >
            <div>
              <h3 className="text-2xl font-bold mb-2 text-gradient-gold">Our Promise</h3>
              <p className="text-luxury-muted">100% Authenticity guaranteed on every single item we curate and deliver.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats/Values */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Star size={32} />, title: 'Premium Quality', desc: 'Vetted by experts' },
          { icon: <ShieldCheck size={32} />, title: 'Secure Buying', desc: 'Bank-level encryption' },
          { icon: <Globe size={32} />, title: 'Global Delivery', desc: 'Express worldwide shipping' },
          { icon: <Trophy size={32} />, title: 'Award Winning', desc: 'Recognized for excellence' },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 glass-card rounded-3xl flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-luxury-gold/10 text-luxury-gold rounded-full flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
            <p className="text-luxury-muted">{item.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
