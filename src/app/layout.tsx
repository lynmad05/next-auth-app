import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
import Provider from "@/components/SessionProvider";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Auth App",
  description: "My Next Auth App",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased bg-gray-50`}>
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-blue-600 tracking-tight">
              AuthApp
            </Link>
            <div className="flex items-center gap-4">
              {session?.user && (
                <>
                  <Link href="/dashboard" className="text-sm text-gray-600 hover:text-blue-600 transition font-medium">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="text-sm text-gray-600 hover:text-blue-600 transition font-medium">
                    Perfil
                  </Link>
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt="avatar"
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-blue-200"
                    />
                  )}
                  <LogoutButton />
                </>
              )}
              {!session?.user && (
                <Link href="/signIn" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                  Iniciar sesión
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