'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Loader2, UploadCloud, X, PlayCircle } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import Link from 'next/link';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    brand: '',
    category: '',
    stock: 0,
    isFeatured: false,
  });

  const [images, setImages] = useState<string[]>([]);
  const [video, setVideo] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Fetch product data
  const { data: productData, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await api.get(`/products/${id}`);
      return response.data.product;
    }
  });

  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/categories');
      return response.data;
    }
  });

  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData.name || '',
        price: productData.price || 0,
        description: productData.description || '',
        brand: productData.brand || '',
        category: productData.category?._id || productData.category || '',
        stock: productData.stock || 0,
        isFeatured: productData.isFeatured || false,
      });
      setImages(productData.images || []);
      setVideo(productData.video || '');
    }
  }, [productData]);

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      await api.put(`/products/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      router.push('/admin/products');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ ...formData, images, video });
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>, isVideo: boolean) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const bodyFormData = new FormData();
    bodyFormData.append('media', file);

    isVideo ? setUploadingVideo(true) : setUploadingImage(true);

    try {
      const response = await api.post('/upload', bodyFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const serverUrl = 'http://localhost:5000'; // Make sure to use your server URL 
      const fullPath = `${serverUrl}${response.data}`;

      if (isVideo) {
        setVideo(fullPath);
      } else {
        setImages([...images, fullPath]);
      }
    } catch (error) {
      console.error('Upload failed', error);
      alert('Failed to upload file');
    } finally {
      isVideo ? setUploadingVideo(false) : setUploadingImage(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, idx) => idx !== indexToRemove));
  };

  if (isLoadingProduct) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-luxury-gold" size={48} /></div>;
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold">Edit Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-card rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold border-b border-luxury-border pb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-luxury-muted font-medium">Product Name</label>
              <input 
                type="text" required
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black/50 border border-luxury-border rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-luxury-muted font-medium">Brand</label>
              <input 
                type="text" required
                value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})}
                className="w-full bg-black/50 border border-luxury-border rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-luxury-muted font-medium">Price ($)</label>
              <input 
                type="number" required min="0" step="0.01"
                value={formData.price} onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                className="w-full bg-black/50 border border-luxury-border rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-luxury-muted font-medium">Stock Quantity</label>
              <input 
                type="number" required min="0"
                value={formData.stock} onChange={(e) => setFormData({...formData, stock: Number(e.target.value)})}
                className="w-full bg-black/50 border border-luxury-border rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-luxury-muted font-medium">Category</label>
              <select 
                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-black/50 border border-luxury-border rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors text-white"
              >
                <option value="">Select Category</option>
                {categoriesData?.categories?.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 flex items-center h-full pt-8">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                  className="w-5 h-5 accent-luxury-gold"
                />
                <span className="text-sm font-medium">Featured Product</span>
              </label>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-luxury-muted font-medium">Description</label>
            <textarea 
              rows={4} required
              value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-black/50 border border-luxury-border rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors text-white resize-none"
            ></textarea>
          </div>
        </div>

        {/* Media Section */}
        <div className="glass-card rounded-2xl p-6 space-y-6">
          <h2 className="text-xl font-semibold border-b border-luxury-border pb-4">Media (Images & Video)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Images */}
            <div className="space-y-4">
              <label className="text-sm text-luxury-muted font-medium block">Product Images</label>
              <div className="flex flex-wrap gap-4">
                {images.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-luxury-border group">
                    <img src={img} alt="Product" className="w-full h-full object-cover" />
                    <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-black/70 p-1 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500">
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <label className="w-24 h-24 rounded-lg border-2 border-dashed border-luxury-border flex flex-col items-center justify-center cursor-pointer hover:border-luxury-gold transition-colors text-luxury-muted hover:text-luxury-gold">
                  {uploadingImage ? <Loader2 className="animate-spin" size={24} /> : <UploadCloud size={24} />}
                  <span className="text-xs mt-2 font-medium">Upload</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => uploadFileHandler(e, false)} />
                </label>
              </div>
            </div>

            {/* Video */}
            <div className="space-y-4">
              <label className="text-sm text-luxury-muted font-medium block">Product Video</label>
              
              <div className="flex gap-4 items-center">
                <input 
                  type="text" placeholder="Or enter video URL"
                  value={video} onChange={(e) => setVideo(e.target.value)}
                  className="flex-1 bg-black/50 border border-luxury-border rounded-lg px-4 py-3 focus:outline-none focus:border-luxury-gold transition-colors text-white"
                />
                <span className="text-luxury-muted text-sm font-bold">OR</span>
                <label className="bg-white/5 border border-luxury-border rounded-lg px-4 py-3 cursor-pointer hover:bg-white/10 transition-colors flex items-center gap-2">
                  {uploadingVideo ? <Loader2 className="animate-spin" size={20} /> : <UploadCloud size={20} />}
                  <span className="text-sm font-medium">Upload File</span>
                  <input type="file" accept="video/*" className="hidden" onChange={(e) => uploadFileHandler(e, true)} />
                </label>
              </div>

              {video && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-luxury-border mt-4 bg-black">
                  <video src={video} controls className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setVideo('')} className="absolute top-3 right-3 bg-black/70 p-2 rounded-full text-white hover:text-red-500 shadow-lg z-10">
                    <X size={16} />
                  </button>
                </div>
              )}
              {!video && (
                <div className="w-full aspect-video rounded-xl border-2 border-dashed border-luxury-border flex flex-col items-center justify-center text-luxury-muted mt-4 bg-black/20">
                  <PlayCircle size={48} className="opacity-20 mb-2" />
                  <span className="text-sm">No video uploaded</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => router.push('/admin/products')} className="px-6 py-3 rounded-lg font-bold hover:bg-white/5 transition-colors">
            Cancel
          </button>
          <button 
            type="submit" disabled={updateMutation.isPending}
            className="bg-luxury-gold text-black px-8 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-500 transition-colors shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50"
          >
            {updateMutation.isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  );
}
