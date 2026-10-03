import { cx } from '@/lib/cx'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  /** Id for the heading, referenced by the section's `aria-labelledby`. */
  id: string
  title: string
  description?: string
  align?: 'start' | 'center'
}

export function SectionHeading({ id, title, description, align = 'center' }: SectionHeadingProps) {
  return (
    <div className={cx(styles.heading, align === 'center' && styles.center)}>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  )
}
