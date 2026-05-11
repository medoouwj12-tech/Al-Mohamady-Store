'use client';

import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Revenue', value: '$124,563.00', icon: <DollarSign size={24} />, trend: '+14%' },
    { title: 'Orders', value: '1,429', icon: <ShoppingBag size={24} />, trend: '+5%' },
    { title: 'Active Users', value: '8,234', icon: <Users size={24} />, trend: '+21%' },
    { title: 'Conversion Rate', value: '3.2%', icon: <TrendingUp size={24} />, trend: '+1.2%' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-luxury-gold/10 text-luxury-gold rounded-xl">
                {stat.icon}
              </div>
              <span className="text-green-500 text-sm font-bold bg-green-500/10 px-2 py-1 rounded-md">
                {stat.trend}
              </span>
            </div>
            <h3 className="text-luxury-muted font-medium mb-1">{stat.title}</h3>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fake Chart Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 glass-card p-6 rounded-2xl"
        >
          <h2 className="text-xl font-bold mb-6">Revenue Analytics</h2>
          <div className="h-64 flex items-end justify-between gap-2 border-b border-luxury-border pb-4">
            {/* CSS Bar Chart Simulation */}
            {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
              <div key={i} className="w-full bg-luxury-gray rounded-t-sm relative group cursor-pointer">
                <div 
                  className="absolute bottom-0 w-full bg-luxury-gold rounded-t-sm transition-all duration-500 group-hover:bg-yellow-400" 
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-luxury-muted text-sm mt-4">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </motion.div>

        {/* Recent Orders */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-6 rounded-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <button className="text-luxury-gold text-sm hover:underline">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { id: '#ORD-001', user: 'Ahmed Ali', amount: '$499.00', status: 'Completed' },
              { id: '#ORD-002', user: 'Sarah M.', amount: '$159.00', status: 'Processing' },
              { id: '#ORD-003', user: 'John Doe', amount: '$1,250.00', status: 'Pending' },
              { id: '#ORD-004', user: 'Emma W.', amount: '$85.00', status: 'Completed' },
            ].map((order, i) => (
              <div key={i} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors">
                <div>
                  <div className="font-bold text-sm">{order.id}</div>
                  <div className="text-luxury-muted text-xs">{order.user}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">{order.amount}</div>
                  <div className={`text-xs ${order.status === 'Completed' ? 'text-green-500' : order.status === 'Processing' ? 'text-luxury-gold' : 'text-gray-400'}`}>
                    {order.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
