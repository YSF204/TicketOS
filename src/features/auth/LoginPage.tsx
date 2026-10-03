import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { PasswordField, TextField } from '@/components/ui/TextField'
import { api, apiError } from '@/lib/api'
import { LoginSchema } from '../../../backend/schema/login.schema'
import { AuthLayout } from './components/AuthLayout/AuthLayout'
import { IntegrationHub } from './components/Showcase/IntegrationHub'
import { ShowcasePanel } from './components/Showcase/ShowcasePanel'
import { SocialAuth } from './components/SocialAuth/SocialAuth'
import { authLinks, loginContent } from './content/auth'
import styles from './AuthPage.module.css'

const emptyForm = { email: '', password: '' }
type Field = keyof typeof emptyForm
const messages: Record<Field, string> = {
  email: 'Enter a valid email address',
  password: 'Enter your password',
}

export function LoginPage() {
  const { showcase } = loginContent
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    const result = LoginSchema.safeParse(form)
    if (!result.success) {
      setErrors(Object.fromEntries(result.error.issues.map((issue) => [issue.path[0], messages[issue.path[0] as Field]])))
      return
    }

    setSubmitting(true)
    try {
      // ponytail: access token is dropped; the refresh cookie is set, so call /auth/refresh once a protected page exists
      await api.post('/auth/login', result.data)
      window.location.assign(authLinks.home)
    } catch (error) {
      setFormError(apiError(error))
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      showcase={
        <ShowcasePanel tag={showcase.tag} tagTone="done" title={showcase.title} description={showcase.description}>
          <IntegrationHub />
        </ShowcasePanel>
      }
    >
      <title>{loginContent.pageTitle}</title>

      <div className={styles.heading}>
        <h1 className={styles.title}>{loginContent.title}</h1>
        <p className={styles.description}>{loginContent.description}</p>
      </div>

      <SocialAuth action="Sign in" />

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <TextField
          label="Work email"
          name="email"
          type="email"
          icon={Mail}
          placeholder="you@company.com"
          autoComplete="email"
          inputMode="email"
          maxLength={255}
          required
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <PasswordField
          label="Password"
          name="password"
          placeholder="Enter your password"
          autoComplete="current-password"
          maxLength={100}
          required
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          labelAction={
            <a href={authLinks.forgotPassword} className={styles.inlineLink}>
              Forgot password?
            </a>
          }
        />
        <Checkbox name="remember" defaultChecked>
          {loginContent.remember}
        </Checkbox>
        {formError && (
          <p role="alert" className={styles.formError}>
            {formError}
          </p>
        )}
        <Button type="submit" size="lg" block className={styles.submit} disabled={submitting}>
          {submitting ? 'Signing in…' : loginContent.submit}
          <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
        </Button>
      </form>

      <p className={styles.switch}>
        {loginContent.switchPrompt}
        <a href={authLinks.signUp} className={styles.inlineLink}>
          {loginContent.switchAction}
        </a>
      </p>
    </AuthLayout>
  )
}
