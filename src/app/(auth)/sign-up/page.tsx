import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          <Image src="/logo.png" alt="School Logo" width={100} height={100} />
        </div>
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/"
          afterSignUpUrl="/dashboard"
        />
      </div>
    </div>
  );
}