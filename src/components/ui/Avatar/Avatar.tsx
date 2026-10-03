import type { CSSProperties, ReactNode } from 'react'
import { cx } from '@/lib/cx'
import styles from './Avatar.module.css'

export type AvatarColor = 'signal' | 'agent' | 'done' | 'amber' | 'alert' | 'slate' | 'violet'

interface AvatarProps {
  initials: string
  color?: AvatarColor
  /** Diameter in pixels. */
  size?: number
  /** Accessible name; omit when the avatar sits next to the person's name. */
  label?: string
  className?: string
}

export function Avatar({ initials, color = 'signal', size = 24, label, className }: AvatarProps) {
  return (
    <span
      className={cx(styles.avatar, styles[color], className)}
      style={{ '--avatar-size': `${size}px` } as CSSProperties}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {initials}
    </span>
  )
}

interface AvatarStackProps {
  children: ReactNode
  className?: string
}

export function AvatarStack({ children, className }: AvatarStackProps) {
  return <span className={cx(styles.stack, className)}>{children}</span>
}
