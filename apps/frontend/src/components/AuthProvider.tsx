import { ClerkProvider } from '@clerk/clerk-react'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!clerkPubKey) {
    throw new Error('Missing Clerk Publishable Key')
  }

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      {children}
    </ClerkProvider>
  )
}
