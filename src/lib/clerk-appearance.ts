/** Light, clean Clerk UI — isolated from JobScout's retro CSS tokens */
export const clerkAppearance = {
  layout: {
    socialButtonsPlacement: 'top',
    socialButtonsVariant: 'blockButton',
  },
  variables: {
    colorBackground: '#ffffff',
    colorInputBackground: '#ffffff',
    colorInputText: '#18181b',
    colorText: '#18181b',
    colorTextSecondary: '#71717a',
    colorPrimary: '#4a4ae8',
    colorDanger: '#ef4444',
    colorSuccess: '#22c55e',
    colorWarning: '#f59e0b',
    colorNeutral: '#71717a',
    borderRadius: '0.75rem',
    fontFamily: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
    fontSize: '0.9375rem',
  },
  elements: {
    rootBox: 'w-full mx-auto',
    cardBox: 'w-full shadow-none',
    card: 'bg-white shadow-xl border border-zinc-200/80 rounded-xl',
    headerTitle: 'text-zinc-900 text-xl font-semibold tracking-tight',
    headerSubtitle: 'text-zinc-500 text-sm',
    socialButtonsBlockButton:
      'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-50 shadow-none',
    socialButtonsBlockButtonText: 'text-zinc-800 font-medium',
    dividerLine: 'bg-zinc-200',
    dividerText: 'text-zinc-400 text-xs',
    formFieldLabel: 'text-zinc-700 text-sm font-medium',
    formFieldInput:
      'bg-white text-zinc-900 border border-zinc-300 rounded-lg placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20',
    formButtonPrimary:
      'bg-[#4a4ae8] hover:bg-[#3b3bd4] text-white rounded-lg shadow-none normal-case tracking-normal',
    footer: 'bg-zinc-50 rounded-b-xl',
    footerActionText: 'text-zinc-500',
    footerActionLink: 'text-[#4a4ae8] hover:text-[#3b3bd4]',
    identityPreviewEditButton: 'text-[#4a4ae8]',
    formFieldInputShowPasswordButton: 'text-zinc-500',
    alertText: 'text-sm',
  },
};
