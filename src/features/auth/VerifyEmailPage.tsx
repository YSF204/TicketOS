import { useEffect, useState } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import { api, apiError } from '@/lib/api'
import { AuthLayout } from './components/AuthLayout/AuthLayout'
import { IntegrationHub } from './components/Showcase/IntegrationHub'
import { ShowcasePanel } from './components/Showcase/ShowcasePanel'
import { authLinks, loginContent } from './content/auth'
import styles from './AuthPage.module.css'

export function VerifyEmailPage() {
  const { showcase } = loginContent
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')
  const pending = !verified && !error

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token') ?? ''
    api
      .post('/auth/verify-email', { token })
      .then(() => setVerified(true))
      .catch((err) => setError(apiError(err)))
  }, [])

  return (
    <AuthLayout
      showcase={
        <ShowcasePanel tag={showcase.tag} tagTone="done" title={showcase.title} description={showcase.description}>
          <IntegrationHub />
        </ShowcasePanel>
      }
    >
      <title>Verify email – TicketOS</title>

      <div className={styles.heading}>
        <h1 className={styles.title}>{pending ? 'Verifying your email…' : verified ? 'Email verified' : 'Verification failed'}</h1>
        {error ? (
          <p role="alert" className={styles.formError}>
            {error} Sign in to get a new link.
          </p>
        ) : (
          <p className={styles.description}>{verified ? 'Your email is confirmed. You can sign in now.' : 'One moment.'}</p>
        )}
      </div>

      {!pending && (
        <ButtonLink href={authLinks.signIn} size="lg" block>
          Go to sign in
        </ButtonLink>
      )}
    </AuthLayout>
  )
}
