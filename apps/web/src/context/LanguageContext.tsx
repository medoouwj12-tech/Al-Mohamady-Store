'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

const translations = {
  en: {
    // Navbar
    home: 'Home',
    shop: 'Shop',
    categories: 'Categories',
    about: 'About',
    login: 'Login',
    logout: 'Logout',
    search: 'Search products...',
    // Shop
    ourCollection: 'Our',
    collection: 'Collection',
    exploreExclusive: 'Explore our exclusive range of premium products.',
    filters: 'Filters',
    sortBy: 'Sort by: Featured',
    allCategories: 'All',
    priceRange: 'Price Range',
    viewDetails: 'View Details',
    errorLoadingProducts: 'Error loading products. Please make sure the backend server is running.',
    // Auth
    welcomeBack: 'Welcome Back',
    signInAccount: 'Sign in to your luxury account',
    emailAddress: 'Email Address',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    signIn: 'Sign In',
    signingIn: 'Signing In...',
    noAccount: "Don't have an account?",
    createAccount: 'Create Account',
    // Cart
    cart: 'Cart',
    // Home
    heroTitle: 'Luxury',
    heroSubtitle: 'Redefined',
    heroDesc: 'Discover our curated collection of premium products crafted for those who demand excellence.',
    shopNow: 'Shop Now',
    featuredProducts: 'Featured',
    products: 'Products',
    // Footer
    quickLinks: 'Quick Links',
    support: 'Support',
    newsletter: 'Newsletter',
    subscribe: 'Subscribe',
    enterEmail: 'Enter your email',
    footerDesc: 'The ultimate destination for luxury goods and premium fashion. Elevate your lifestyle with our exclusive collections.',
  },
  ar: {
    // Navbar
    home: 'الرئيسية',
    shop: 'المتجر',
    categories: 'الفئات',
    about: 'من نحن',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    search: 'ابحث عن المنتجات...',
    // Shop
    ourCollection: 'مجموعتنا',
    collection: '',
    exploreExclusive: 'اكتشف مجموعتنا الحصرية من المنتجات الفاخرة.',
    filters: 'تصفية',
    sortBy: 'ترتيب: مميز',
    allCategories: 'الكل',
    priceRange: 'نطاق السعر',
    viewDetails: 'عرض التفاصيل',
    errorLoadingProducts: 'خطأ في تحميل المنتجات. يرجى التأكد من أن الخادم يعمل.',
    // Auth
    welcomeBack: 'مرحباً بعودتك',
    signInAccount: 'سجّل دخولك إلى حسابك الفاخر',
    emailAddress: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    signIn: 'تسجيل الدخول',
    signingIn: 'جارٍ تسجيل الدخول...',
    noAccount: 'ليس لديك حساب؟',
    createAccount: 'إنشاء حساب',
    // Cart
    cart: 'السلة',
    // Home
    heroTitle: 'الفخامة',
    heroSubtitle: 'بمعنى جديد',
    heroDesc: 'اكتشف مجموعتنا المنتقاة من المنتجات الفاخرة المصنوعة لمن يطلب التميز.',
    shopNow: 'تسوق الآن',
    featuredProducts: 'منتجات',
    products: 'مميزة',
    // Footer
    quickLinks: 'روابط سريعة',
    support: 'الدعم',
    newsletter: 'النشرة البريدية',
    subscribe: 'اشترك',
    enterEmail: 'أدخل بريدك الإلكتروني',
    footerDesc: 'وجهتك المثلى للسلع الفاخرة والأزياء الراقية. ارفع مستوى أسلوب حياتك مع مجموعاتنا الحصرية.',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang') as Language;
    if (stored === 'ar' || stored === 'en') {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lang', lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{ fontFamily: isRTL ? "'Cairo', sans-serif" : undefined }}>
        {isRTL && (
          <style>{`@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');`}</style>
        )}
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
