import type { ReactNode } from 'react'
import { Badge, type BadgeTone } from '@/components/ui/Badge'
import styles from './Showcase.module.css'

interface ShowcasePanelProps {
  tag: string
  tagTone: BadgeTone
  title: string
  description: string
  /** The product visual. */
  children: ReactNode
}

export function ShowcasePanel({ tag, tagTone, title, description, children }: ShowcasePanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.intro}>
        <Badge tone={tagTone} dot className={styles.tag}>
          {tag}
        </Badge>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.stage}>{children}</div>
    </div>
  )
}
