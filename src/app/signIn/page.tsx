'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { useState } from 'react';

type Mode = 'login' | 'register';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleGitHubSignIn = async () => {
    await signIn('github', { callbackUrl: '/dashboard' });
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await signIn('credentials', { email, password, redirect: false });
    setLoading(false);
    if (result?.error) setError(result.error);
    else router.push('/dashboard');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) setError(data.error || 'Error al registrarse');
    else {
      setSuccess('Cuenta creada exitosamente. Ya puedes iniciar sesion.');
      setMode('login');
      setName('');
      setPassword('');
    }
  };

  const inputClass =
    'w-full bg-[#0f1117] border border-[#2a2d3a] text-gray-100 placeholder-gray-600 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition';

  return (
    <div className="min-h-screen bg-[#080a0f] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0d0f18] items-center justify-center p-16">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-transparent to-cyan-900/20" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-8">
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse" />
            <span className="text-violet-300 text-xs font-medium tracking-wide">SECURE AUTHENTICATION</span>
          </div>
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Acceso seguro<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
              para tu aplicacion
            </span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-10">
            Plataforma de autenticacion con OAuth 2.0, sesiones seguras y proteccion de rutas con NextAuth.js
          </p>
          <div className="space-y-4">
            {['OAuth 2.0 con Google y GitHub', 'Sesiones JWT seguras', 'Proteccion de rutas con middleware', 'Cifrado de contrasenas con bcrypt'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-violet-500/20 border border-violet-500/40 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-violet-400" />
                </div>
                <span className="text-gray-400 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm" />
              </div>
              <span className="text-white font-semibold text-sm">AuthApp</span>
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">
              {mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
            </h1>
            <p className="text-gray-500 text-sm">
              {mode === 'login'
                ? 'Ingresa tus credenciales para continuar'
                : 'Completa el formulario para registrarte'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-[#0f1117] border border-[#2a2d3a] rounded-xl p-1 mb-6">
            {(['login', 'register'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-lg transition ${
                  mode === m
                    ? 'bg-[#1a1d2e] text-white shadow border border-[#2a2d3a]'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {m === 'login' ? 'Iniciar sesion' : 'Registrarse'}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl mb-4 text-xs">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-xl mb-4 text-xs">
              {success}
            </div>
          )}

          {mode === 'login' && (
            <form onSubmit={handleCredentialsLogin} className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  required placeholder="usuario@email.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Contrasena</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  required placeholder="••••••••" className={inputClass} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white py-3 rounded-lg font-semibold text-sm transition disabled:opacity-40">
                {loading ? 'Verificando...' : 'Iniciar sesion'}
              </button>
            </form>
          )}

          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Nombre completo</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  required placeholder="Tu nombre" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  required placeholder="usuario@email.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">Contrasena</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  required minLength={6} placeholder="Min. 6 caracteres" className={inputClass} />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white py-3 rounded-lg font-semibold text-sm transition disabled:opacity-40">
                {loading ? 'Creando cuenta...' : 'Crear cuenta'}
              </button>
            </form>
          )}

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[#2a2d3a]" />
            <span className="text-xs text-gray-600">o continua con</span>
            <div className="flex-1 h-px bg-[#2a2d3a]" />
          </div>

          <div className="space-y-3">
            <button onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-[#0f1117] border border-[#2a2d3a] text-gray-300 py-3 rounded-lg text-sm font-medium hover:border-gray-500 hover:text-white transition">
              <FaGoogle className="text-red-400 text-sm" />
              Continuar con Google
            </button>
            <button onClick={handleGitHubSignIn}
              className="w-full flex items-center justify-center gap-3 bg-[#0f1117] border border-[#2a2d3a] text-gray-300 py-3 rounded-lg text-sm font-medium hover:border-gray-500 hover:text-white transition">
              <FaGithub className="text-gray-300 text-sm" />
              Continuar con GitHub
            </button>
          </div>

          <p className="text-center text-xs text-gray-700 mt-8">
            Desarrollo de Aplicaciones Web Avanzado — Tecsup 2026
          </p>
        </div>
      </div>
    </div>
  );
}