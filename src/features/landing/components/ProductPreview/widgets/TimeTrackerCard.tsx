import { Ellipsis, Pause, Square } from 'lucide-react'
import { useStopwatch } from '@/hooks/useStopwatch'
import { cx } from '@/lib/cx'
import { trackerStartSeconds } from '../mockData'
import { WidgetCard } from './WidgetCard'
import styles from './Widgets.module.css'

export function TimeTrackerCard() {
  const elapsed = useStopwatch(trackerStartSeconds)

  return (
    <WidgetCard
      title="Time tracker"
      action={<Ellipsis size={16} className={styles.action} />}
      className={styles.tracker}
    >
      <div className={styles.trackerBody}>
        <span className={styles.clock}>{elapsed}</span>
        <span className={styles.session}>
          <span className={styles.liveDot} />
          Active sprint session
        </span>
        <div className={styles.controls}>
          <span className={styles.control}>
            <Pause size={13} strokeWidth={2.5} fill="currentColor" />
          </span>
          <span className={cx(styles.control, styles.stop)}>
            <Square size={11} strokeWidth={0} fill="currentColor" />
          </span>
        </div>
      </div>
    </WidgetCard>
  )
}
