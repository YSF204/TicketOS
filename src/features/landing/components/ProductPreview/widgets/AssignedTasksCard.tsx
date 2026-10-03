import { Avatar } from '@/components/ui/Avatar'
import { ProgressBar } from '@/components/ui/Progress'
import { cx } from '@/lib/cx'
import { assignedTabs, assignedTasks } from '../mockData'
import { WidgetCard } from './WidgetCard'
import styles from './Widgets.module.css'

const iconToneClass = { sticky: styles.iconSticky, done: styles.iconDone, alert: styles.iconAlert }

export function AssignedTasksCard() {
  return (
    <WidgetCard
      title={
        <>
          Tasks I’ve assigned
          <span className={styles.tabs}>
            {assignedTabs.map((tab, index) => (
              <span key={tab} className={cx(styles.tab, index === 0 && styles.tabActive)}>
                {tab}
              </span>
            ))}
          </span>
        </>
      }
      action={<span className={styles.link}>View all (14)</span>}
    >
      <ul className={styles.taskList}>
        {assignedTasks.map((task) => {
          const Icon = task.icon
          return (
            <li key={task.id} className={styles.taskRow}>
              <span className={cx(styles.taskIcon, iconToneClass[task.iconTone])}>
                <Icon size={13} strokeWidth={2} />
              </span>
              <span className={styles.taskText}>
                <span className={styles.taskTitle}>{task.title}</span>
                <span className={styles.ticketId}>{task.id}</span>
              </span>
              <ProgressBar value={task.progress} tone={task.tone} />
              <span className={styles.percent}>{task.progress}%</span>
              <Avatar initials={task.assignee.initials} color={task.assignee.color} size={22} />
            </li>
          )
        })}
      </ul>
    </WidgetCard>
  )
}
