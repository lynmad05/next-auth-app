import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import Provider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuthApp",
  description: "Next Auth App",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body className={`${inter.className} bg-[#080a0f] text-white`}>
        <nav className="border-b border-[#1a1d2e] bg-[#080a0f]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-sm" />
              </div>
              <span className="font-semibold text-sm text-white">AuthApp</span>
            </Link>
            <div className="flex items-center gap-2">
              {session?.user ? (
                <>
                  <Link href="/dashboard"
                    className="text-xs text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition font-medium">
                    Dashboard
                  </Link>
                  <Link href="/profile"
                    className="text-xs text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition font-medium">
                    Perfil
                  </Link>
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      width={32}
                      height={32}
                      className="rounded-full ring-2 ring-violet-500/30 ml-1"
                    />
                  )}
                  <LogoutButton />
                </>
              ) : (
                <Link href="/signIn"
                  className="text-xs bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg transition font-semibold">
                  Iniciar sesion
                </Link>
              )}
            </div>
          </div>
        </nav>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}