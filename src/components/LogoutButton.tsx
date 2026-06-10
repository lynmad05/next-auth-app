'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/signIn' })}
      className="text-sm bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
    >
      Cerrar sesión
    </button>
  );
}