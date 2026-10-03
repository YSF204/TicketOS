import { cx } from '@/lib/cx'
import styles from './Logo.module.css'

interface LogoMarkProps {
  size?: number
  className?: string
}

/** Four tickets on a board — the one in progress is lit. */
export function LogoMark({ size = 22, className }: LogoMarkProps) {
  return (
    <svg
      className={cx(styles.mark, className)}
      width={size}
      height={size}
      viewBox="0 0 22 22"
      aria-hidden="true"
      focusable="false"
    >
      <rect className={styles.ink} x="2" y="2" width="8" height="8" rx="2.5" />
      <rect className={styles.ink} x="12" y="2" width="8" height="8" rx="2.5" />
      <rect className={styles.ink} x="2" y="12" width="8" height="8" rx="2.5" />
      <rect className={styles.active} x="12" y="12" width="8" height="8" rx="2.5" />
    </svg>
  )
}

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <span className={cx(styles.logo, className)}>
      <LogoMark />
      TicketOS
    </span>
  )
}
