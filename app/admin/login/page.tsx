"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin/orders');
      } else {
        const data = await res.json();
        setError(data?.error || 'Invalid password');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FBF8F3]">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h2 className="font-serif text-xl font-bold mb-4">Admin Login</h2>
        {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
        <label className="text-sm">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded mt-2" />
        <button disabled={loading} className="mt-4 w-full py-2 bg-[#1A1A1A] text-white rounded">{loading ? 'Checking...' : 'Login'}</button>
      </form>
    </main>
  );
}
