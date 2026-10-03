import { Fragment, type CSSProperties } from 'react'
import { cx } from '@/lib/cx'
import styles from './Illustrations.module.css'

const weeks = ['W40', 'W41', 'W42', 'W43', 'W44']

/** `start` and `span` are percentages of the five-week window. */
const tracks = [
  { label: 'Sprint 42', text: 'In review, 65%', start: 0, span: 58, tone: styles.barSticky },
  { label: 'Dashboard', text: 'Building, 42%', start: 30, span: 52, tone: styles.barSignal },
  { label: 'Auth v3', text: 'Shipped', start: 4, span: 30, tone: styles.barDone },
]

const todayAt = 55

export function TimelinePanel() {
  return (
    <div className={cx(styles.panel, styles.panelWide)} aria-hidden="true">
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>Project timeline</span>
        <span className={styles.panelLink}>Q4 roadmap</span>
      </div>

      <div className={styles.timeline}>
        <span />
        <div className={styles.weeks}>
          {weeks.map((week) => (
            <span key={week}>{week}</span>
          ))}
        </div>

        {tracks.map((track) => (
          <Fragment key={track.label}>
            <span className={styles.trackLabel}>{track.label}</span>
            <div className={styles.lane}>
              <span
                className={cx(styles.bar, track.tone)}
                style={{ '--start': `${track.start}%`, '--span': `${track.span}%` } as CSSProperties}
              >
                <span className={styles.barText}>{track.text}</span>
              </span>
            </div>
          </Fragment>
        ))}

        <span className={styles.today} style={{ '--at': todayAt / 100 } as CSSProperties} />
      </div>
    </div>
  )
}
