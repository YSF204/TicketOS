import { ProgressRing } from '@/components/ui/Progress'
import { cx } from '@/lib/cx'
import styles from './Illustrations.module.css'

const events = [
  { time: '10:00 – 11:00', title: 'Sprint planning', tone: styles.eventDone },
  { time: '14:00 – 15:00', title: 'Design review', tone: styles.eventSignal },
  { time: '16:30 – 17:30', title: 'Focus block', tone: styles.eventSticky },
]

export function SchedulePanel() {
  return (
    <div className={styles.split} aria-hidden="true">
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>Weekly schedule</span>
          <span className={cx(styles.panelMeta, styles.scheduleDate)}>Mon, Oct 5</span>
        </div>
        <ul className={styles.events}>
          {events.map((event) => (
            <li key={event.title} className={cx(styles.event, event.tone)}>
              <span className={styles.eventTitle}>{event.title}</span>
              <span className={styles.eventTime}>{event.time}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={cx(styles.panel, styles.workload)}>
        <span className={styles.panelTitle}>Team workload</span>
        <ProgressRing value={75} tone="sticky" size={84} strokeWidth={9} className={styles.workloadRing} />
        <span className={styles.panelMeta}>Healthy load</span>
      </div>
    </div>
  )
}
