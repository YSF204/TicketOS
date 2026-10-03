import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/Progress'
import { cx } from '@/lib/cx'
import { seatUsage, sidebarItems, sidebarWorkspaces } from '../mockData'
import styles from './DesktopDashboard.module.css'

const workspaceDot = { alert: styles.dotAlert, done: styles.dotDone, signal: styles.dotSignal }

export function DashboardSidebar() {
  return (
    <div className={styles.sidebar}>
      <span className={styles.createButton}>
        <Plus size={14} strokeWidth={2.5} />
        Create new task
      </span>

      <div className={styles.navGroup}>
        <span className={styles.groupLabel}>General</span>
        <ul>
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.label} className={cx(styles.navItem, item.active && styles.navItemActive)}>
                <Icon size={15} strokeWidth={1.75} />
                <span className={styles.navLabel}>{item.label}</span>
                {item.count !== undefined && (
                  <span className={cx(styles.count, item.countTone === 'signal' && styles.countSignal)}>
                    {item.count}
                  </span>
                )}
                {item.tag && (
                  <Badge tone="agent" size="sm">
                    {item.tag}
                  </Badge>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      <div className={styles.navGroup}>
        <span className={styles.groupLabel}>
          Workspaces
          <Plus size={12} strokeWidth={2} />
        </span>
        <ul>
          {sidebarWorkspaces.map((workspace) => (
            <li key={workspace.name} className={styles.navItem}>
              <span className={cx(styles.workspaceDot, workspaceDot[workspace.color])} />
              <span className={styles.navLabel}>{workspace.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.plan}>
        <span className={styles.planName}>{seatUsage.plan}</span>
        <span className={styles.planMeta}>
          {seatUsage.used} of {seatUsage.total} seats used
        </span>
        <ProgressBar value={(seatUsage.used / seatUsage.total) * 100} height={5} />
      </div>
    </div>
  )
}
