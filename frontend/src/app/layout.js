import { Geist, Geist_Mono } from "next/font/google";
import Navbar from '@/components/Navbar'; //
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Solify - Marketplace สำหรับ Solar Cell',
  description: 'ซื้อขายอุปกรณ์ Solar Cell ระบบตัวกลาง Escrow',
};

export default function RootLayout({ children }) {
  return (
   <html lang="en">
      <body className="bg-slate-50 min-h-screen text-slate-800">
        <Navbar />
        <main className="max-w-7xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
