/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { SignIn, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function SignInWrapper() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      try {
        router.push('/dashboard');
        toast('Signed in successfully!');
      } catch (error) {
        toast('Failed to redirect after sign-in.');
      }
    }
  }, [isSignedIn, router]);

  return (
    <SignIn
      
      signUpUrl="/sign-up"
      fallbackRedirectUrl="/dashboard"
      appearance={{
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary-dark text-white',
          card: 'shadow-none',
          headerTitle: 'hidden',
          headerSubtitle: 'hidden',
        },
      }}
    />
  );
}