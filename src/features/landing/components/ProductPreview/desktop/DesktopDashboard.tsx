import { Bell, Calendar, ChevronDown, SlidersHorizontal, Sparkles } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { previewUser } from '../mockData'
import { ActivityCard } from '../widgets/ActivityCard'
import { AssignedTasksCard } from '../widgets/AssignedTasksCard'
import { DocSummaryCard } from '../widgets/DocSummaryCard'
import { TimeTrackerCard } from '../widgets/TimeTrackerCard'
import { TodoCard } from '../widgets/TodoCard'
import { DashboardSidebar } from './DashboardSidebar'
import styles from './DesktopDashboard.module.css'

/** A static rendering of the TicketOS home dashboard, used as an illustration. */
export function DesktopDashboard() {
  return (
    <div className={styles.window}>
      <div className={styles.chrome}>
        <div className={styles.chromeStart}>
          <span className={styles.lights}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.divider} />
          <Calendar size={14} strokeWidth={1.75} className={styles.muted} />
          <span className={styles.date}>{previewUser.date}</span>
        </div>

        <div className={styles.search}>
          <Sparkles size={14} strokeWidth={2} className={styles.spark} />
          <span className={styles.searchText}>Ask TicketOS AI: summarize sprint blockers or draft a PRD…</span>
          <kbd className={styles.kbd}>⌘K</kbd>
        </div>

        <div className={styles.chromeEnd}>
          <span className={styles.bell}>
            <Bell size={16} strokeWidth={1.75} />
          </span>
          <Avatar initials={previewUser.initials} size={26} />
          <span className={styles.userName}>{previewUser.shortName}</span>
          <ChevronDown size={14} className={styles.muted} />
        </div>
      </div>

      <div className={styles.body}>
        <DashboardSidebar />

        <div className={styles.main}>
          <div className={styles.greeting}>
            <div>
              <p className={styles.hello}>Good morning, {previewUser.firstName}</p>
              <p className={styles.subtitle}>
                Here’s what’s happening across your {previewUser.projectCount} projects today.
              </p>
            </div>
            <span className={styles.customize}>
              <SlidersHorizontal size={13} strokeWidth={2} />
              Customize
            </span>
          </div>

          <div className={styles.gridTop}>
            <TodoCard />
            <TimeTrackerCard />
            <ActivityCard />
          </div>

          <div className={styles.gridBottom}>
            <AssignedTasksCard />
            <DocSummaryCard />
          </div>
        </div>
      </div>
    </div>
  )
}
