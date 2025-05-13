'use client';

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-primary p-4 text-white">
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="School Logo" width={40} height={40} />
        <Link href="/dashboard">
          <h1 className="text-xl font-bold">Mizizi Learning Hub Activities </h1>
        </Link>
      </div>
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
}