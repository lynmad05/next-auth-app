import { getServerSession } from 'next-auth';
import { authOptions } from '../../lib/auth';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[#080a0f] p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Perfil</h1>
          <p className="text-gray-500 text-sm mt-1">Informacion de tu cuenta</p>
        </div>

        <div className="bg-[#0d0f18] border border-[#1a1d2e] rounded-2xl overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-violet-900/50 via-purple-900/30 to-cyan-900/50" />
          <div className="px-8 pb-8">
            <div className="-mt-10 mb-6">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={80}
                  height={80}
                  className="rounded-2xl ring-4 ring-[#0d0f18] shadow-xl"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl ring-4 ring-[#0d0f18] bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                  {session?.user?.name?.[0]}
                </div>
              )}
            </div>

            <h2 className="text-xl font-bold text-white mb-1">{session?.user?.name}</h2>
            <p className="text-gray-500 text-sm mb-6">{session?.user?.email}</p>

            <div className="space-y-3">
              {[
                { label: 'Nombre completo', value: session?.user?.name },
                { label: 'Correo electronico', value: session?.user?.email },
                { label: 'Estado', value: 'Activo' },
              ].map((field) => (
                <div key={field.label} className="bg-[#080a0f] border border-[#2a2d3a] rounded-xl px-5 py-4 flex justify-between items-center">
                  <span className="text-gray-500 text-xs uppercase tracking-wider">{field.label}</span>
                  <span className="text-white text-sm font-medium">{field.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}