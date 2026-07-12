import { SignIn } from '@clerk/nextjs';
import { BrandLogo } from '@/components/BrandLogo';
import { clerkAppearance } from '@/lib/clerk-appearance';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f4f5] px-4 py-10">
      <div className="mb-6">
        <BrandLogo size={36} wordmarkClassName="font-retro text-xs text-zinc-800" />
      </div>
      <div className="clerk-ui w-full max-w-[420px]">
        <SignIn
          appearance={clerkAppearance}
          forceRedirectUrl="/dashboard"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
}
