import { cx } from '@/lib/cx'
import styles from './PasswordStrength.module.css'

export type StrengthLevel = 0 | 1 | 2 | 3 | 4

const levels: Record<StrengthLevel, { label: string; className?: string }> = {
  0: { label: '' },
  1: { label: 'Weak', className: styles.weak },
  2: { label: 'Fair', className: styles.fair },
  3: { label: 'Good', className: styles.good },
  4: { label: 'Strong', className: styles.strong },
}

interface PasswordStrengthProps {
  /** 0 = nothing typed yet, 4 = strong. Compute it in your form logic. */
  level: StrengthLevel
  /** Requirement shown on the right, e.g. "At least 8 characters". */
  rule: string
}

export function PasswordStrength({ level, rule }: PasswordStrengthProps) {
  const { label, className } = levels[level]

  return (
    <div className={cx(styles.strength, className)}>
      <div className={styles.meter} aria-hidden="true">
        {[1, 2, 3, 4].map((segment) => (
          <span key={segment} className={cx(styles.segment, segment <= level && styles.filled)} />
        ))}
      </div>
      <div className={styles.legend}>
        <span className={styles.label} aria-live="polite">
          {label && `${label} password`}
        </span>
        <span>{rule}</span>
      </div>
    </div>
  )
}
