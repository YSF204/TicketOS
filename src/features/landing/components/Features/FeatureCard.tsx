import type { ReactNode } from 'react'
import { cx } from '@/lib/cx'
import styles from './FeatureCard.module.css'

interface FeatureCardProps {
  title: string
  description: string
  /** The product illustration shown on the card's inset plate. */
  illustration: ReactNode
  className?: string
}

export function FeatureCard({ title, description, illustration, className }: FeatureCardProps) {
  return (
    <li className={cx(styles.card, className)}>
      <div className={styles.plate}>{illustration}</div>
      <div className={styles.text}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </li>
  )
}
