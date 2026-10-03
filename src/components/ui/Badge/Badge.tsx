import type { ComponentProps } from 'react'
import { cx } from '@/lib/cx'
import styles from './Badge.module.css'

export type BadgeTone = 'neutral' | 'signal' | 'done' | 'agent' | 'sticky' | 'alert'

interface BadgeProps extends ComponentProps<'span'> {
  tone?: BadgeTone
  size?: 'sm' | 'md'
  /** Leading status dot in the badge colour. */
  dot?: boolean
}

export function Badge({ tone = 'neutral', size = 'md', dot = false, className, children, ...rest }: BadgeProps) {
  return (
    <span className={cx(styles.badge, styles[tone], size === 'sm' && styles.sm, className)} {...rest}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  )
}
