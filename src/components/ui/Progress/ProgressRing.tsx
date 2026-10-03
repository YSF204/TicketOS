import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import type { ProgressTone } from './ProgressBar'
import styles from './Progress.module.css'

interface ProgressRingProps {
  /** 0–100 */
  value: number
  tone?: ProgressTone
  /** Outer diameter in pixels. */
  size?: number
  strokeWidth?: number
  /** Centre content; defaults to the percentage. */
  children?: ReactNode
  label?: string
  className?: string
}

export function ProgressRing({
  value,
  tone = 'signal',
  size = 56,
  strokeWidth = 6,
  children,
  label,
  className,
}: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const radius = (size - strokeWidth) / 2

  return (
    <div
      className={cx(styles.ring, styles[tone], className)}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      aria-label={label}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle className={styles.track} cx={size / 2} cy={size / 2} r={radius} strokeWidth={strokeWidth} />
        <circle
          className={styles.arc}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          pathLength={100}
          strokeDasharray={`${clamped} 100`}
        />
      </svg>
      <span className={styles.label}>{children ?? `${clamped}%`}</span>
    </div>
  )
}
