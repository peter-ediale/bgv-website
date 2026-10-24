"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogoutPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await fetch('/api/admin/logout');
      router.push('/admin/login');
    })();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FBF8F3]">
      <div className="bg-white p-8 rounded shadow">Logging out...</div>
    </main>
  );
}
