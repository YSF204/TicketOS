import type { CSSProperties } from 'react'
import { cx } from '@/lib/cx'
import styles from './Progress.module.css'

export type ProgressTone = 'signal' | 'done' | 'sticky' | 'agent' | 'alert'

interface ProgressBarProps {
  /** 0–100 */
  value: number
  tone?: ProgressTone
  /** Track thickness in pixels. */
  height?: number
  label?: string
  className?: string
}

export function ProgressBar({ value, tone = 'signal', height = 4, label, className }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div
      className={cx(styles.bar, styles[tone], className)}
      style={{ '--progress-height': `${height}px` } as CSSProperties}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label={label}
    >
      <div className={styles.fill} style={{ width: `${clamped}%` }} />
    </div>
  )
}
