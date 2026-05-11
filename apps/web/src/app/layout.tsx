import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Al-Mohamady Commerce | Luxury SaaS E-Commerce",
  description: "Enterprise-level multi-feature E-Commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-luxury-black text-luxury-text antialiased min-h-screen flex flex-col`}>
        <QueryProvider>
          <Navbar />
          <main className="flex-grow pt-24">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
