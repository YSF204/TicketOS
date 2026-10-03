import type { ComponentType } from 'react'
import { LoginPage } from '@/features/auth/LoginPage'
import { SignupPage } from '@/features/auth/SignupPage'
import { VerifyEmailPage } from '@/features/auth/VerifyEmailPage'
import { LandingPage } from '@/features/landing/LandingPage'

/* Minimal path switch until the app needs a real router */
const routes: Record<string, ComponentType> = {
  '/login': LoginPage,
  '/signup': SignupPage,
  '/verify-email': VerifyEmailPage,
}

function App() {
  const Page = routes[window.location.pathname.replace(/\/+$/, '')] ?? LandingPage
  return <Page />
}

export default App
