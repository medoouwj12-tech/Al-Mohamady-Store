'use client';

import { motion } from 'framer-motion';
import { Store, Globe, Shield, Bell, Palette } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminSettingsPage() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="space-y-6">
        {/* Store Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-luxury-gold/10 rounded-xl text-luxury-gold"><Store size={20} /></div>
            <h2 className="text-xl font-bold">Store Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-luxury-muted mb-2">Store Name</label>
              <input defaultValue="Al-Mohamady Commerce" className="w-full bg-black/50 border border-luxury-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-luxury-gold" />
            </div>
            <div>
              <label className="block text-sm text-luxury-muted mb-2">Store Email</label>
              <input defaultValue="admin@almohamady.com" className="w-full bg-black/50 border border-luxury-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-luxury-gold" />
            </div>
            <div>
              <label className="block text-sm text-luxury-muted mb-2">Currency</label>
              <select defaultValue="USD" className="w-full bg-black/50 border border-luxury-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-luxury-gold">
                <option value="USD">USD - US Dollar</option>
                <option value="EGP">EGP - Egyptian Pound</option>
                <option value="SAR">SAR - Saudi Riyal</option>
                <option value="AED">AED - UAE Dirham</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-luxury-muted mb-2">Timezone</label>
              <select defaultValue="Africa/Cairo" className="w-full bg-black/50 border border-luxury-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-luxury-gold">
                <option value="Africa/Cairo">Cairo (GMT+2)</option>
                <option value="Asia/Riyadh">Riyadh (GMT+3)</option>
                <option value="Asia/Dubai">Dubai (GMT+4)</option>
                <option value="America/New_York">New York (GMT-5)</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Language Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-luxury-gold/10 rounded-xl text-luxury-gold"><Globe size={20} /></div>
            <h2 className="text-xl font-bold">Language & Display</h2>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setLanguage('en')}
              className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${language === 'en' ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold' : 'border-luxury-border text-luxury-muted hover:border-white/30'}`}
            >
              🇺🇸 English
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`flex-1 py-4 rounded-xl border-2 font-bold transition-all ${language === 'ar' ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold' : 'border-luxury-border text-luxury-muted hover:border-white/30'}`}
            >
              🇸🇦 العربية
            </button>
          </div>
          <p className="text-luxury-muted text-sm mt-3">Current language: <span className="text-white font-bold">{language === 'en' ? 'English' : 'Arabic (RTL)'}</span></p>
        </motion.div>

        {/* Security Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-luxury-gold/10 rounded-xl text-luxury-gold"><Shield size={20} /></div>
            <h2 className="text-xl font-bold">Security</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-luxury-muted mb-2">Admin Email</label>
              <input defaultValue="admin@almohamady.com" type="email" className="w-full bg-black/50 border border-luxury-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-luxury-gold" />
            </div>
            <div>
              <label className="block text-sm text-luxury-muted mb-2">New Password</label>
              <input type="password" placeholder="Leave blank to keep current" className="w-full bg-black/50 border border-luxury-border rounded-xl py-3 px-4 text-white focus:outline-none focus:border-luxury-gold" />
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-luxury-gold/10 rounded-xl text-luxury-gold"><Bell size={20} /></div>
            <h2 className="text-xl font-bold">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { label: 'New order notifications', defaultChecked: true },
              { label: 'Low stock alerts', defaultChecked: true },
              { label: 'New user registrations', defaultChecked: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                <span className="text-sm">{item.label}</span>
                <input type="checkbox" defaultChecked={item.defaultChecked} className="w-4 h-4 accent-luxury-gold" />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex justify-end">
          <button className="bg-luxury-gold text-black px-8 py-3 rounded-xl font-bold hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
