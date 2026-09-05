'use client';
import Link from 'next/link';
import { ShoppingBag, Wallet, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
          ☀️ Solify
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:text-yellow-400 flex items-center gap-1">
            <ShoppingBag size={18} /> สินค้า Solar Cell
          </Link>
          <Link href="/wallet" className="hover:text-yellow-400 flex items-center gap-1">
            <Wallet size={18} /> กระเป๋าเงิน
          </Link>
          <Link href="/login" className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-semibold px-4 py-1.5 rounded-lg transition">
            เข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </nav>
  );
}