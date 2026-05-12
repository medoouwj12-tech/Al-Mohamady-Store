'use client';

import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { Loader2, Users, Shield, User, Trash2 } from 'lucide-react';

export default function AdminUsersPage() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const response = await api.get('/auth/users');
      return response.data;
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/auth/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  const users = data?.users || [];

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
        <h1 className="text-3xl font-bold">Users Management</h1>
        <div className="text-luxury-muted text-sm">
          Total: <span className="text-white font-bold">{users.length}</span> users
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden">
        {users.length === 0 ? (
          <div className="p-16 text-center">
            <Users size={48} className="text-luxury-muted mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Users Found</h3>
            <p className="text-luxury-muted">Registered users will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black/40 border-b border-luxury-border">
                  <th className="p-4 font-semibold text-luxury-muted text-sm">User</th>
                  <th className="p-4 font-semibold text-luxury-muted text-sm">Email</th>
                  <th className="p-4 font-semibold text-luxury-muted text-sm">Role</th>
                  <th className="p-4 font-semibold text-luxury-muted text-sm">Joined</th>
                  <th className="p-4 font-semibold text-luxury-muted text-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any, index: number) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-luxury-border/50 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold font-bold text-sm">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-luxury-muted text-sm">{user.email}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${
                        user.role === 'admin' ? 'bg-luxury-gold/10 text-luxury-gold' : 'bg-white/5 text-gray-400'
                      }`}>
                        {user.role === 'admin' ? <Shield size={12} /> : <User size={12} />}
                        {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-luxury-muted">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this user?')) {
                                deleteMutation.mutate(user._id);
                              }
                            }}
                            className="p-2 text-luxury-muted hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
