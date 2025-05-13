import { SignInWrapper } from '@/components/client/sign-in-wrapper';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.png"
            alt="Mizizi School Logo"
            width={100}
            height={100}
            priority
          />
        </div>
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Welcome to Mizizi Activity 
        </h2>
        <SignInWrapper />
      </div>
    </div>
  );
}