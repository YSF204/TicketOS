import { ChevronDown } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ProgressRing } from '@/components/ui/Progress'
import { cx } from '@/lib/cx'
import { weeklyActivity } from '../mockData'
import { WidgetCard } from './WidgetCard'
import styles from './Widgets.module.css'

const toneClass = { ink: undefined, signal: styles.toneSignal, sticky: styles.toneSticky }

export function ActivityCard() {
  return (
    <WidgetCard
      title="Activity overview"
      action={
        <Badge tone="neutral" size="sm">
          Weekly
          <ChevronDown size={10} strokeWidth={2.5} />
        </Badge>
      }
    >
      <div className={styles.activity}>
        <dl className={styles.stats}>
          {weeklyActivity.stats.map((stat) => (
            <div key={stat.label}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={cx(styles.statValue, toneClass[stat.tone])}>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <ProgressRing value={weeklyActivity.goal} size={84} strokeWidth={9}>
          <span className={styles.ringCaption}>
            {weeklyActivity.goal}%<small>of goal</small>
          </span>
        </ProgressRing>
      </div>
    </WidgetCard>
  )
}
