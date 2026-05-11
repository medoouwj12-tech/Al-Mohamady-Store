import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-luxury-border bg-luxury-black pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient-gold tracking-tighter">AL-MOHAMADY</h3>
            <p className="text-luxury-muted text-sm leading-relaxed max-w-xs">
              The ultimate destination for luxury goods and premium fashion. Elevate your lifestyle with our exclusive collections.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/shop" className="text-luxury-muted hover:text-luxury-gold text-sm transition-colors">Shop All</Link></li>
              <li><Link href="/categories" className="text-luxury-muted hover:text-luxury-gold text-sm transition-colors">Categories</Link></li>
              <li><Link href="/featured" className="text-luxury-muted hover:text-luxury-gold text-sm transition-colors">Featured</Link></li>
              <li><Link href="/about" className="text-luxury-muted hover:text-luxury-gold text-sm transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><Link href="/faq" className="text-luxury-muted hover:text-luxury-gold text-sm transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="text-luxury-muted hover:text-luxury-gold text-sm transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="text-luxury-muted hover:text-luxury-gold text-sm transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="text-luxury-muted hover:text-luxury-gold text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6">Newsletter</h4>
            <p className="text-luxury-muted text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-luxury-gray border border-luxury-border text-white px-4 py-2 rounded-md w-full focus:outline-none focus:border-luxury-gold transition-colors"
              />
              <button className="bg-luxury-gold text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-luxury-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-luxury-muted text-sm">
            © {new Date().getFullYear()} Al-Mohamady Commerce. All rights reserved.
          </p>
          <div className="flex gap-4">
            {/* Social Icons Placeholders */}
            <div className="w-8 h-8 rounded-full bg-luxury-gray flex items-center justify-center hover:bg-luxury-border cursor-pointer transition-colors">X</div>
            <div className="w-8 h-8 rounded-full bg-luxury-gray flex items-center justify-center hover:bg-luxury-border cursor-pointer transition-colors">In</div>
            <div className="w-8 h-8 rounded-full bg-luxury-gray flex items-center justify-center hover:bg-luxury-border cursor-pointer transition-colors">Fb</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
