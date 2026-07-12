import { SignIn } from '@clerk/nextjs';
import { clerkAppearance } from '@/lib/clerk-appearance';

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f4f5] px-4 py-10">
      <p className="mb-6 font-retro text-xs text-zinc-800">JOBSCOUT</p>
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
