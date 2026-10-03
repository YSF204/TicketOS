import type { CSSProperties } from 'react'
import { RefreshCw, Rocket, Sparkles } from 'lucide-react'
import { GithubIcon, SlackIcon } from '@/components/icons/BrandIcons'
import { Avatar, AvatarStack } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { ProgressRing } from '@/components/ui/Progress'
import { cx } from '@/lib/cx'
import { sprintBoard } from '../../content/auth'
import styles from './Showcase.module.css'

const integrationIcons = [<GithubIcon key="github" size={14} />, <SlackIcon key="slack" size={14} />]

const dotTone = {
  signal: styles.dotSignal,
  sticky: styles.dotSticky,
  agent: styles.dotAgent,
}

/** Sign-up visual: an active sprint card with the sprint agent's sticky note pinned to it. */
export function SprintBoard() {
  const { note, noteAuthor, name, status, goal, velocity, tickets, team, extraMembers, synced, integrations } =
    sprintBoard

  return (
    <div className={styles.board} aria-hidden="true">
      <div className={cx(styles.note, styles.settle)} style={{ '--tilt': '-3deg', '--order': 2 } as CSSProperties}>
        <span className={styles.pin} />
        <span className={styles.noteAuthor}>
          <Sparkles size={12} strokeWidth={2} />
          {noteAuthor}
        </span>
        <p className={styles.noteText}>{note}</p>
      </div>

      <div className={cx(styles.sprint, styles.settle)} style={{ '--tilt': '0deg', '--order': 0 } as CSSProperties}>
        <div className={styles.sprintHead}>
          <span className={styles.sprintIcon}>
            <Rocket size={18} strokeWidth={1.75} />
          </span>
          <div className={styles.sprintTitleBlock}>
            <div className={styles.sprintTitleRow}>
              <span className={styles.sprintName}>{name}</span>
              <Badge tone="done" size="sm" dot>
                {status}
              </Badge>
            </div>
            <span className={styles.sprintGoal}>{goal}</span>
          </div>
          <div className={styles.velocity}>
            <ProgressRing value={velocity.value} size={40} strokeWidth={4} className={styles.velocityRing} />
            <span className={styles.velocityText}>
              <span className={styles.velocityLabel}>Velocity</span>
              <span className={styles.velocityValue}>{velocity.label}</span>
            </span>
          </div>
        </div>

        <ul className={styles.tickets}>
          {tickets.map((ticket) => (
            <li key={ticket.id} className={styles.ticket}>
              <span className={cx(styles.ticketDot, dotTone[ticket.tone])} />
              <span className={styles.ticketId}>{ticket.id}</span>
              <span className={styles.ticketTitle}>{ticket.title}</span>
              <Badge tone={ticket.tone} size="sm">
                {ticket.status}
              </Badge>
            </li>
          ))}
        </ul>

        <div className={styles.sprintFoot}>
          <AvatarStack>
            {team.map((member) => (
              <Avatar key={member.initials} initials={member.initials} color={member.color} size={28} />
            ))}
            <span className={styles.moreMembers}>+{extraMembers}</span>
          </AvatarStack>
          <span className={styles.synced}>
            <RefreshCw size={12} strokeWidth={2} />
            {synced}
          </span>
        </div>
      </div>

      <ul className={styles.chips}>
        {integrations.map((label, index) => (
          <li
            key={label}
            className={cx(styles.chip, styles.settle)}
            style={{ '--tilt': index === 0 ? '-1.5deg' : '1.5deg', '--order': 3 + index } as CSSProperties}
          >
            {integrationIcons[index]}
            {label}
          </li>
        ))}
      </ul>
    </div>
  )
}
