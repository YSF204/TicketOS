export interface NavLink {
  label: string
  href: string
  badge?: string
}

export const primaryNav: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'AI assistant', href: '#assistant', badge: 'New' },
  { label: 'Product tour', href: '#tour' },
]

export const authActions = {
  signIn: { label: 'Sign in', href: '/login' },
  signUp: { label: 'Start for free', href: '/signup' },
  demo: { label: 'Book a demo', href: '/demo' },
} satisfies Record<string, NavLink>
