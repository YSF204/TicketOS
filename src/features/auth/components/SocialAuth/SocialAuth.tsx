import { GithubIcon, GoogleIcon } from '@/components/icons/BrandIcons'
import { Button } from '@/components/ui/Button'
import styles from './SocialAuth.module.css'

interface SocialAuthProps {
  /** Verb used on the buttons: "Sign in" or "Sign up". */
  action: 'Sign in' | 'Sign up'
}

/** Google and GitHub buttons plus the divider into the email form. Not wired up yet. */
export function SocialAuth({ action }: SocialAuthProps) {
  return (
    <div className={styles.social}>
      <div className={styles.providers}>
        <Button variant="secondary" block className={styles.provider}>
          <GoogleIcon size={18} />
          {action} with Google
        </Button>
        <Button variant="secondary" block className={styles.provider}>
          <GithubIcon size={18} />
          {action} with GitHub
        </Button>
      </div>

      <div className={styles.divider}>
        <span>or continue with email</span>
      </div>
    </div>
  )
}
