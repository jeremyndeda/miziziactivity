'use client';

import { ClerkProvider, useUser } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/client/navbar';
import { Sidebar } from '@/components/client/sidebar';
import { ConvexProvider, ConvexReactClient } from 'convex/react';

const inter = Inter({ subsets: ['latin'] });

// Convex client setup
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <ConvexProvider client={convex}>
            <AuthenticatedLayout>{children}</AuthenticatedLayout>
          </ConvexProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

// Separate component for using useUser safely inside ClerkProvider
function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();

  if (user === undefined) {
    return <div className="min-h-screen p-6">Loading...</div>;
  }

  return user ? (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  ) : (
    <div className="min-h-screen">{children}</div>
  );
}
