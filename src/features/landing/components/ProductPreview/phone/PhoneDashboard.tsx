import {
  BatteryFull,
  Bell,
  CalendarClock,
  Check,
  ChevronDown,
  Pause,
  Plus,
  Search,
  Signal,
  Sparkles,
  Square,
  Wifi,
} from 'lucide-react'
import { Avatar, AvatarStack } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { ProgressRing } from '@/components/ui/Progress'
import { useStopwatch } from '@/hooks/useStopwatch'
import { cx } from '@/lib/cx'
import { phoneBacklog, phoneStats, phoneTabs, phoneUpNext, previewUser, trackerStartSeconds } from '../mockData'
import styles from './PhoneDashboard.module.css'

/** The TicketOS home screen on a phone, used as an illustration on small viewports. */
export function PhoneDashboard() {
  const elapsed = useStopwatch(trackerStartSeconds)
  const donePercent = Math.round((phoneStats.done / phoneStats.total) * 100)

  return (
    <div className={styles.phone}>
      <div className={styles.screen}>
        <div className={styles.statusBar}>
          <span>9:41</span>
          <span className={styles.island} />
          <span className={styles.statusIcons}>
            <Signal size={13} strokeWidth={2.5} />
            <Wifi size={13} strokeWidth={2.5} />
            <BatteryFull size={16} strokeWidth={2} />
          </span>
        </div>

        <div className={styles.header}>
          <Avatar initials={previewUser.initials} size={34} />
          <div className={styles.who}>
            <span className={styles.name}>
              {previewUser.shortName}
              <ChevronDown size={13} strokeWidth={2} />
            </span>
            <span className={styles.sprint}>{previewUser.sprint}</span>
          </div>
          <span className={styles.iconButton}>
            <Search size={14} strokeWidth={2} />
          </span>
          <span className={cx(styles.iconButton, styles.hasDot)}>
            <Bell size={14} strokeWidth={2} />
          </span>
        </div>

        <div className={styles.prompt}>
          <span className={styles.promptIcon}>
            <Sparkles size={12} strokeWidth={2.5} />
          </span>
          Ask AI: summarize sprint blockers…
        </div>

        <div className={styles.cards}>
          <div className={styles.card}>
            <span className={styles.cardLabel}>Time tracker</span>
            <span className={styles.clock}>{elapsed}</span>
            <div className={styles.trackerRow}>
              <span className={styles.control}>
                <Pause size={11} strokeWidth={2.5} fill="currentColor" />
              </span>
              <span className={cx(styles.control, styles.stop)}>
                <Square size={9} strokeWidth={0} fill="currentColor" />
              </span>
              <span className={styles.billable}>Billable</span>
            </div>
          </div>

          <div className={styles.card}>
            <span className={styles.cardLabel}>Tasks done</span>
            <div className={styles.doneRow}>
              <div className={styles.doneText}>
                <span className={styles.clock}>
                  {phoneStats.done}
                  <span className={styles.total}>/{phoneStats.total}</span>
                </span>
                <span className={styles.onTrack}>On schedule</span>
              </div>
              <ProgressRing value={donePercent} size={40} strokeWidth={4.5} className={styles.ring} />
            </div>
          </div>
        </div>

        <div className={styles.upNext}>
          <span className={styles.upNextIcon}>
            <CalendarClock size={15} strokeWidth={2} />
          </span>
          <div className={styles.who}>
            <span className={styles.upNextTitle}>{phoneUpNext.title}</span>
            <span className={styles.sprint}>{phoneUpNext.time}</span>
          </div>
          <AvatarStack>
            {phoneUpNext.attendees.map((person) => (
              <Avatar key={person.initials} initials={person.initials} color={person.color} size={22} />
            ))}
          </AvatarStack>
        </div>

        <div className={styles.backlog}>
          <div className={styles.backlogHeader}>
            <span className={styles.backlogTitle}>To-do backlog</span>
            <span className={styles.newTask}>
              <Plus size={11} strokeWidth={2.5} />
              New task
            </span>
          </div>
          <ul className={styles.backlogList}>
            {phoneBacklog.map((item) => (
              <li key={item.label} className={styles.backlogItem}>
                <span className={cx(styles.checkbox, item.done && styles.checked)}>
                  {item.done && <Check size={10} strokeWidth={3} />}
                </span>
                <span className={cx(styles.backlogLabel, item.done && styles.backlogDone)}>{item.label}</span>
                <Badge tone={item.tag.tone} size="sm">
                  {item.tag.label}
                </Badge>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.tabBar}>
          {phoneTabs.map((tab) => {
            const Icon = tab.icon
            return (
              <span key={tab.label} className={cx(styles.tabItem, tab.active && styles.tabActive)}>
                <Icon size={18} strokeWidth={tab.active ? 2.25 : 1.75} />
                {tab.label}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
