import { getServerSession } from 'next-auth';
import { authOptions} from '../../lib/auth'; 
import Image from 'next/image';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-[#080a0f] p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <p className="text-gray-500 text-sm mb-1">Bienvenido de nuevo</p>
          <h1 className="text-3xl font-bold text-white">{session?.user?.name}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Estado de sesion', value: 'Activa', color: 'emerald' },
            { label: 'Proveedor', value: 'OAuth / Credentials', color: 'violet' },
            { label: 'Acceso', value: 'Verificado', color: 'cyan' },
          ].map((card) => (
            <div key={card.label} className="bg-[#0d0f18] border border-[#1a1d2e] rounded-2xl p-6">
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{card.label}</p>
              <p className="text-white font-semibold text-lg">{card.value}</p>
              <div className={`mt-3 w-8 h-1 rounded-full bg-${card.color}-500`} />
            </div>
          ))}
        </div>

        <div className="bg-[#0d0f18] border border-[#1a1d2e] rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4 text-sm uppercase tracking-widest text-gray-400">
            Informacion de sesion
          </h2>
          <div className="flex items-center gap-4">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt="avatar"
                width={56}
                height={56}
                className="rounded-full ring-2 ring-violet-500/30"
              />
            )}
            <div>
              <p className="text-white font-semibold">{session?.user?.name}</p>
              <p className="text-gray-500 text-sm">{session?.user?.email}</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-emerald-400 text-xs font-medium">En linea</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}