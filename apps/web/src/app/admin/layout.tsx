'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, PackageSearch } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.replace('/login');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', href: '/admin/products', icon: <PackageSearch size={20} /> },
    { name: 'Orders', href: '/admin/orders', icon: <ShoppingBag size={20} /> },
    { name: 'Users', href: '/admin/users', icon: <Users size={20} /> },
    { name: 'Settings', href: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-luxury-black">
      {/* Admin Sidebar */}
      <motion.aside 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 bg-luxury-gray border-r border-luxury-border fixed h-full z-40 flex flex-col"
      >
        <div className="p-6 border-b border-luxury-border">
          <h2 className="text-2xl font-bold text-gradient-gold tracking-tighter">AL-MOHAMADY</h2>
          <p className="text-xs text-luxury-muted mt-1 uppercase tracking-widest">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-luxury-gold text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-luxury-border">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors">
            <LogOut size={20} />
            Exit Admin
          </Link>
        </div>
      </motion.aside>

      {/* Admin Content Area */}
      <div className="flex-1 ml-64 bg-luxury-black">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
