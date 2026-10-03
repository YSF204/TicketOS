import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ArrowRight, CircleCheck, Mail, MailCheck, User } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { PasswordField, TextField } from '@/components/ui/TextField'
import { api, apiError } from '@/lib/api'
import { RegistrationSchema } from '../../../backend/schema/registration.schema'
import { AuthLayout } from './components/AuthLayout/AuthLayout'
import { PasswordStrength, type StrengthLevel } from './components/PasswordStrength/PasswordStrength'
import { ShowcasePanel } from './components/Showcase/ShowcasePanel'
import { SprintBoard } from './components/Showcase/SprintBoard'
import { SocialAuth } from './components/SocialAuth/SocialAuth'
import { authLinks, signupContent } from './content/auth'
import styles from './AuthPage.module.css'

const emptyForm = { firstName: '', lastName: '', email: '', confirmEmail: '', password: '', acceptTerms: false }
type Field = keyof typeof emptyForm
/* confirmEmail falls back to the schema's own "do not match" message */
const messages: Partial<Record<Field, string>> = {
  firstName: 'Enter your first name',
  lastName: 'Enter your last name',
  email: 'Enter a valid email address',
  password: 'Use 8 to 100 characters',
}

function passwordStrength(password: string): StrengthLevel {
  if (!password) return 0
  if (password.length < 8) return 1
  const extras = [password.length >= 12, /[a-z]/.test(password) && /[A-Z]/.test(password), /[\d\W]/.test(password)]
  return (1 + extras.filter(Boolean).length) as StrengthLevel
}

/* Field names match backend/schema/registration.schema.ts */
export function SignupPage() {
  const { showcase } = signupContent
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError('')

    const result = RegistrationSchema.safeParse(form)
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          result.error.issues.map((issue) => [issue.path[0], messages[issue.path[0] as Field] ?? issue.message]),
        ),
      )
      return
    }
    if (!form.acceptTerms) {
      setFormError('Please accept the Terms of Service and Privacy Policy.')
      return
    }

    setSubmitting(true)
    try {
      await api.post('/auth/register', result.data)
      setSent(true)
    } catch (error) {
      setFormError(apiError(error))
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout
      showcase={
        <ShowcasePanel tag={showcase.tag} tagTone="agent" title={showcase.title} description={showcase.description}>
          <SprintBoard />
        </ShowcasePanel>
      }
    >
      <title>{signupContent.pageTitle}</title>

      <div className={styles.heading}>
        <Badge tone="signal" dot className={styles.tag}>
          {signupContent.tag}
        </Badge>
        <h1 className={styles.title}>{signupContent.title}</h1>
        <p className={styles.description}>{signupContent.description}</p>
      </div>

      <SocialAuth action="Sign up" />

      {sent ? (
        <p role="status" className={styles.description}>
          We sent a verification link to <strong>{form.email}</strong>. Open it to activate your account, then sign in.
        </p>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.nameRow}>
            <TextField
              label="First name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
              icon={User}
              placeholder="Amanda"
              autoComplete="given-name"
              maxLength={100}
              required
            />
            <TextField
              label="Last name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
              icon={User}
              placeholder="Peterson"
              autoComplete="family-name"
              maxLength={100}
              required
            />
          </div>
          <TextField
            label="Work email"
            name="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            type="email"
            icon={Mail}
            placeholder="you@company.com"
            autoComplete="email"
            inputMode="email"
            maxLength={255}
            required
          />
          <TextField
            label="Confirm email"
            name="confirmEmail"
              value={form.confirmEmail}
              onChange={handleChange}
              error={errors.confirmEmail}
            type="email"
            icon={MailCheck}
            placeholder="Type your email again"
            autoComplete="email"
            inputMode="email"
            maxLength={255}
            required
          />
          <PasswordField
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={8}
            maxLength={100}
            required
            hint={<PasswordStrength level={passwordStrength(form.password)} rule={signupContent.passwordRule} />}
          />
          <Checkbox name="acceptTerms" required checked={form.acceptTerms} onChange={handleChange}>
            I agree to the <a href={authLinks.terms}>Terms of Service</a> and{' '}
            <a href={authLinks.privacy}>Privacy Policy</a>.
          </Checkbox>
          {formError && (
            <p role="alert" className={styles.formError}>
              {formError}
            </p>
          )}
          <Button type="submit" size="lg" block className={styles.submit} disabled={submitting}>
            {submitting ? 'Creating account…' : signupContent.submit}
            <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
          </Button>
          <p className={styles.assurance}>
            <CircleCheck size={14} strokeWidth={2} aria-hidden="true" />
            {signupContent.assurance}
          </p>
        </form>
      )}

      <p className={styles.switch}>
        {signupContent.switchPrompt}
        <a href={authLinks.signIn} className={styles.inlineLink}>
          {signupContent.switchAction}
        </a>
      </p>
    </AuthLayout>
  )
}
