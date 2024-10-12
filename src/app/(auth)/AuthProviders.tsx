"use client";
import { Button } from "@/components/ui/button";
import { addCsrfToken } from "@/utils/csrf";
import { imageLoader } from "@/utils/functions";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface Provider {
  id: string;
  name: string;
  type: string;
}

interface AuthProvidersProps {
  providers: Record<string, Provider>;
}

export default function AuthProviders({ providers }: AuthProvidersProps) {
  const handleSignIn = async (providerId: string) => {
    const callbackUrl = await addCsrfToken("/api/auth/callback/${providerId}");
    await signIn(providerId, { callbackUrl });
  };
  console.log(providers)
  return (
    <div className="w-full max-w-sm text-center">
      <div className="flex items-center justify-center mb-3">
        <div className="flex-grow h-px bg-gray-base" />
        <span className="mx-3 text-lg-semi-darker">Or continue with</span>
        <div className="flex-grow h-px bg-gray-base" />
      </div>
      <div className="grid grid-cols-3  gap-2">
        {Object.values(providers).map((provider) => {
          return (
            <Button
              key={provider.id}
              onClick={() => handleSignIn(provider.id)}
              variant={"outline"}
              className=" justify-between"
            >
              <Image
                src={imageLoader(`icons/${provider.id}.svg`)}
                alt={`${provider.name} icon`}
                width={20}
                height={20}
              />
              <span>{provider.name}</span>
              <span></span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

// 'use client';

// import { useSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';

// export default function AuthLayout({ children }: { children: React.ReactNode }) {
//   const { data: session, status } = useSession();

//   if (status === 'loading') {
//     return <div>Loading...</div>;
//   }

//   if (session) {
//     redirect('/dashboard'); // Redirect to dashboard or home page if already signed in
//   }

//   return <>{children}</>;
// }

// import AuthLayout from './AuthLayout';

// export default function SignInLayout({ children }: { children: React.ReactNode }) {
//   return <AuthLayout>{children}</AuthLayout>;
// }
