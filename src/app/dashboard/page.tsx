import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
            <p className="text-gray-600 text-sm mb-1">Bienvenido de nuevo,</p>
            <p className="text-2xl font-semibold text-gray-900">{session?.user?.name}</p>
            <p className="text-gray-500 text-sm mt-1">{session?.user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}