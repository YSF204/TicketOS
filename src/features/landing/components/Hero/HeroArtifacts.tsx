import type { CSSProperties, ReactNode } from 'react'
import { Check, Clock } from 'lucide-react'
import { GithubIcon, GmailIcon, SlackIcon } from '@/components/icons/BrandIcons'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/Progress'
import { cx } from '@/lib/cx'
import { heroContent } from '../../content/hero'
import styles from './HeroArtifacts.module.css'

const dotClass = { sticky: styles.dotSticky, done: styles.dotDone }

interface ArtifactProps {
  /** Resting tilt in degrees, as if dropped on the desk. */
  tilt: number
  /** Position in the entrance sequence. */
  order: number
  className?: string
  children: ReactNode
}

function Artifact({ tilt, order, className, children }: ArtifactProps) {
  return (
    <div className={cx(styles.artifact, className)} style={{ '--tilt': `${tilt}deg`, '--order': order } as CSSProperties}>
      {children}
    </div>
  )
}

function ClockFace() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
      <circle cx="15" cy="15" r="12.5" fill="#fff" stroke="var(--ink)" strokeWidth="2" />
      <path d="M15 8v7l4 2.5" fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 15 11 21" stroke="var(--alert)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="15" cy="15" r="1.6" fill="var(--alert)" />
    </svg>
  )
}

/** Artifacts above the headline: sticky note, done checkbox, clock and standup reminder. */
export function HeroArtifactsTop() {
  const { stickyNote, reminder } = heroContent

  return (
    <div className={cx(styles.layer, styles.top)} aria-hidden="true">
      <Artifact tilt={-4} order={0} className={styles.sticky}>
        <span className={styles.pin} />
        <p className={styles.stickyText}>{stickyNote}</p>
      </Artifact>

      <Artifact tilt={-8} order={2} className={cx(styles.tile, styles.checkTile)}>
        <span className={styles.check}>
          <Check size={16} strokeWidth={3} />
        </span>
      </Artifact>

      <Artifact tilt={7} order={1} className={cx(styles.tile, styles.clockTile)}>
        <ClockFace />
      </Artifact>

      <Artifact tilt={3} order={3} className={cx(styles.card, styles.reminder)}>
        <div className={styles.cardRow}>
          <span className={styles.cardMeta}>{reminder.label}</span>
          <Badge tone="signal" size="sm">
            {reminder.tag}
          </Badge>
        </div>
        <p className={styles.reminderTitle}>{reminder.title}</p>
        <p className={styles.cardMeta}>{reminder.detail}</p>
        <span className={styles.timeChip}>
          <Clock size={12} strokeWidth={2} />
          {reminder.time}
        </span>
      </Artifact>
    </div>
  )
}

/** Artifacts below the call to action: today's tasks, calendar page and integrations. */
export function HeroArtifactsBottom() {
  const { todaysTasks, integrations, calendar } = heroContent

  return (
    <div className={cx(styles.layer, styles.bottom)} aria-hidden="true">
      <Artifact tilt={-2} order={4} className={cx(styles.card, styles.tasks)}>
        <div className={styles.cardRow}>
          <span className={styles.cardTitle}>{todaysTasks.title}</span>
          <span className={styles.cardLink}>{todaysTasks.link}</span>
        </div>
        <ul className={styles.taskList}>
          {todaysTasks.items.map((task) => (
            <li key={task.label} className={styles.task}>
              <div className={styles.taskRow}>
                <span className={cx(styles.dot, dotClass[task.dot])} />
                <span className={styles.taskLabel}>{task.label}</span>
                <span className={styles.taskValue}>{task.progress}%</span>
              </div>
              <ProgressBar value={task.progress} tone={task.tone} />
            </li>
          ))}
        </ul>
      </Artifact>

      <Artifact tilt={-6} order={6} className={cx(styles.tile, styles.calendar)}>
        <span className={styles.calendarMonth}>{calendar.month}</span>
        <span className={styles.calendarDay}>{calendar.day}</span>
      </Artifact>

      <Artifact tilt={2} order={5} className={cx(styles.card, styles.integrations)}>
        <div className={styles.cardRow}>
          <span className={styles.cardTitle}>{integrations.title}</span>
          <Badge tone="done" size="sm">
            {integrations.status}
          </Badge>
        </div>
        <div className={styles.apps}>
          <span className={styles.app}>
            <GmailIcon size={18} />
          </span>
          <span className={styles.app}>
            <SlackIcon size={18} />
          </span>
          <span className={styles.app}>
            <GithubIcon size={18} />
          </span>
        </div>
      </Artifact>
    </div>
  )
}
