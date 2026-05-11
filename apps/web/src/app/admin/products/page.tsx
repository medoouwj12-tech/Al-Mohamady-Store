'use client';

import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, MoreVertical, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const response = await api.get('/products');
      return response.data;
    }
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/products', {});
      return response.data.product;
    },
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      router.push(`/admin/products/edit/${product._id}`);
    }
  });

  const handleCreate = () => {
    createMutation.mutate();
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
    }
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteMutation.mutate(id);
    }
  };

  const products = data?.products || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-luxury-gold" size={48} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Products Management</h1>
        <button 
          onClick={handleCreate}
          disabled={createMutation.isPending}
          className="bg-luxury-gold text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.2)] disabled:opacity-50"
        >
          {createMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
          Add New Product
        </button>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-luxury-border flex justify-between items-center bg-white/5">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-luxury-muted" />
            </div>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full bg-black/50 border border-luxury-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-luxury-gold transition-colors text-white"
            />
          </div>
          <div className="flex gap-2 text-sm text-luxury-muted">
            <button className="px-3 py-1 hover:text-white transition-colors">All</button>
            <button className="px-3 py-1 hover:text-white transition-colors">Active</button>
            <button className="px-3 py-1 hover:text-white transition-colors">Drafts</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/40 border-b border-luxury-border">
                <th className="p-4 font-semibold text-luxury-muted text-sm">Product Name</th>
                <th className="p-4 font-semibold text-luxury-muted text-sm">Category</th>
                <th className="p-4 font-semibold text-luxury-muted text-sm">Price</th>
                <th className="p-4 font-semibold text-luxury-muted text-sm">Stock</th>
                <th className="p-4 font-semibold text-luxury-muted text-sm">Status</th>
                <th className="p-4 font-semibold text-luxury-muted text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any, index: number) => (
                <motion.tr 
                  key={product._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-luxury-border/50 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-luxury-gray shrink-0 border border-luxury-border overflow-hidden">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-semibold">{product.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-luxury-muted text-sm">{product.category?.name || 'Uncategorized'}</td>
                  <td className="p-4 font-medium">${product.price}</td>
                  <td className="p-4 text-sm">{product.stock}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                      product.stock > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                    }`}>
                      {product.stock > 0 ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/products/edit/${product._id}`} className="p-2 text-luxury-muted hover:text-luxury-gold transition-colors"><Edit size={16} /></Link>
                      <button onClick={() => handleDelete(product._id)} className="p-2 text-luxury-muted hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      <button className="p-2 text-luxury-muted hover:text-white transition-colors"><MoreVertical size={16} /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-luxury-border flex justify-between items-center text-sm text-luxury-muted bg-white/5">
          <span>Showing 1 to 5 of 24 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-luxury-border rounded hover:bg-white/10 transition-colors">Prev</button>
            <button className="px-3 py-1 bg-luxury-gold text-black rounded font-bold">1</button>
            <button className="px-3 py-1 border border-luxury-border rounded hover:bg-white/10 transition-colors">2</button>
            <button className="px-3 py-1 border border-luxury-border rounded hover:bg-white/10 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
