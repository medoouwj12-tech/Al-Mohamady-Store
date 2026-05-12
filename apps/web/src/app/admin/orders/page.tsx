'use client';

import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Loader2, Package, Eye, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      const response = await api.get('/orders');
      return response.data;
    }
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const response = await api.put(`/orders/${id}`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-orders'] });
    }
  });

  const orders = data?.orders || [];

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400',
    processing: 'bg-blue-500/10 text-blue-400',
    shipped: 'bg-purple-500/10 text-purple-400',
    delivered: 'bg-green-500/10 text-green-400',
    cancelled: 'bg-red-500/10 text-red-400',
  };

  const statusIcon: Record<string, React.ReactNode> = {
    pending: <Clock size={14} />,
    processing: <Package size={14} />,
    delivered: <CheckCircle size={14} />,
    cancelled: <XCircle size={14} />,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-luxury-gold" size={48} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders Management</h1>
        <div className="text-luxury-muted text-sm">
          Total: <span className="text-white font-bold">{orders.length}</span> orders
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card rounded-2xl p-16 text-center">
          <Package size={48} className="text-luxury-muted mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Orders Yet</h3>
          <p className="text-luxury-muted">When customers place orders, they'll appear here.</p>
        </div>
      ) : (
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 border-b border-luxury-border">
                  <th className="p-4 font-semibold text-luxury-muted text-sm">Order ID</th>
                  <th className="p-4 font-semibold text-luxury-muted text-sm">Customer</th>
                  <th className="p-4 font-semibold text-luxury-muted text-sm">Items</th>
                  <th className="p-4 font-semibold text-luxury-muted text-sm">Total</th>
                  <th className="p-4 font-semibold text-luxury-muted text-sm">Status</th>
                  <th className="p-4 font-semibold text-luxury-muted text-sm">Date</th>
                  <th className="p-4 font-semibold text-luxury-muted text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order: any, index: number) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-luxury-border/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 font-mono text-xs text-luxury-muted">#{order._id.slice(-8).toUpperCase()}</td>
                    <td className="p-4">
                      <div className="font-semibold text-sm">{order.user?.name || 'Guest'}</div>
                      <div className="text-xs text-luxury-muted">{order.user?.email}</div>
                    </td>
                    <td className="p-4 text-sm">{order.orderItems?.length || 0} items</td>
                    <td className="p-4 font-bold text-luxury-gold">${order.totalPrice?.toFixed(2)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${statusColor[order.status] || 'bg-gray-500/10 text-gray-400'}`}>
                        {statusIcon[order.status]}
                        {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-luxury-muted">
                      {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <select
                          defaultValue={order.status}
                          onChange={(e) => updateStatusMutation.mutate({ id: order._id, status: e.target.value })}
                          className="text-xs bg-black/50 border border-luxury-border rounded-lg px-2 py-1 text-white focus:outline-none focus:border-luxury-gold"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
