import { FileText, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { docSummary } from '../mockData'
import { WidgetCard } from './WidgetCard'
import styles from './Widgets.module.css'

export function DocSummaryCard() {
  return (
    <WidgetCard
      title={
        <Badge tone="agent" size="sm">
          <Sparkles size={10} strokeWidth={2.5} />
          AI document assistant
        </Badge>
      }
      action={<span className={styles.link}>Active file</span>}
      className={styles.docCard}
    >
      <div className={styles.file}>
        <span className={styles.fileIcon}>
          <FileText size={14} strokeWidth={2} />
        </span>
        <span className={styles.fileText}>
          <span className={styles.fileName}>{docSummary.file}</span>
          <span className={styles.fileMeta}>{docSummary.meta}</span>
        </span>
      </div>
      <p className={styles.summary}>
        <strong>AI summary: </strong>
        {docSummary.summary}
      </p>
      <div className={styles.docFooter}>
        Ask a question about this doc
        <span className={styles.askButton}>Ask AI</span>
      </div>
    </WidgetCard>
  )
}
