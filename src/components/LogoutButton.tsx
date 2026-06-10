'use client';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/signIn' })}
      className="text-xs text-gray-400 hover:text-red-400 px-3 py-2 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition font-medium"
    >
      Cerrar sesion
    </button>
  );
}