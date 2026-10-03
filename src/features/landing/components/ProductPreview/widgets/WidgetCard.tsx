import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import styles from './Widgets.module.css'

interface WidgetCardProps {
  title: ReactNode
  /** Right side of the header: a link, menu or filter. */
  action?: ReactNode
  className?: string
  children: ReactNode
}

/** The card shell every dashboard widget sits in. */
export function WidgetCard({ title, action, className, children }: WidgetCardProps) {
  return (
    <div className={cx(styles.card, className)}>
      <div className={styles.header}>
        <span className={styles.title}>{title}</span>
        {action}
      </div>
      {children}
    </div>
  )
}
