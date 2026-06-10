import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Image from 'next/image';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32" />
          <div className="px-8 pb-8">
            <div className="-mt-12 mb-4">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full border-4 border-white shadow-md"
                />
              ) : (
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
                  {session?.user?.name?.[0]}
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{session?.user?.name}</h1>
            <p className="text-gray-500 mt-1">{session?.user?.email}</p>
            <div className="mt-6 border-t pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Nombre</p>
                  <p className="font-semibold text-gray-800 mt-1">{session?.user?.name}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Email</p>
                  <p className="font-semibold text-gray-800 mt-1 truncate">{session?.user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}