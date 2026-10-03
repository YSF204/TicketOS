import { Plus } from 'lucide-react'
import { Avatar, type AvatarColor } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { cx } from '@/lib/cx'
import styles from './Illustrations.module.css'

type Presence = 'online' | 'busy' | 'away'

const members: { name: string; role: string; initials: string; color: AvatarColor; presence: Presence; status: string; ticket?: string }[] = [
  { name: 'Amanda Peterson', role: 'Design lead', initials: 'AP', color: 'signal', presence: 'online', status: 'Online' },
  { name: 'Jane Fox', role: 'Tech lead', initials: 'JF', color: 'agent', presence: 'busy', status: 'Editing', ticket: 'TOS-214' },
  { name: 'Marcus Kim', role: 'Product manager', initials: 'MK', color: 'violet', presence: 'away', status: 'Away' },
]

export function TeamPanel() {
  return (
    <div className={styles.panel} aria-hidden="true">
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>Product launch Q4</span>
        <Badge tone="done" size="sm" dot>
          5 active
        </Badge>
      </div>
      <ul className={styles.members}>
        {members.map((member) => (
          <li key={member.name} className={styles.member}>
            <span className={styles.avatarWrap}>
              <Avatar initials={member.initials} color={member.color} size={28} />
              <span className={cx(styles.presence, styles[member.presence])} />
            </span>
            <span className={styles.memberText}>
              <span className={styles.memberName}>{member.name}</span>
              <span className={styles.memberRole}>{member.role}</span>
            </span>
            <span className={styles.memberStatus}>
              {member.status} {member.ticket && <strong>{member.ticket}</strong>}
            </span>
          </li>
        ))}
      </ul>
      <div className={styles.invite}>
        <Plus size={12} strokeWidth={2.5} />
        Invite teammate
      </div>
    </div>
  )
}
