'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'BUYER'
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      alert('สมัครสมาชิกสำเร็จ!');
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-slate-100">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-800">สมัครสมาชิก Solify</h2>
      
      {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">ชื่อ-นามสกุล</label>
          <input
            type="text"
            required
            className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">อีเมล</label>
          <input
            type="email"
            required
            className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">รหัสผ่าน</label>
          <input
            type="password"
            required
            className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">ประเภทบัญชี</label>
          <select
            className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            <option value="BUYER">ผู้ซื้อ (Buyer)</option>
            <option value="SELLER">ผู้ขาย (Seller)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-2 rounded-lg transition mt-2"
        >
          ยืนยันการสมัคร
        </button>
      </form>
    </div>
  );
}