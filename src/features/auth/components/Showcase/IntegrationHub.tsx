import type { CSSProperties, ReactNode } from 'react'
import { CalendarDays, Check, Sparkles } from 'lucide-react'
import { DriveIcon, GithubIcon, GmailIcon, SlackIcon } from '@/components/icons/BrandIcons'
import { LogoMark } from '@/components/ui/Logo'
import { cx } from '@/lib/cx'
import { hubNodes, type HubNodeId } from '../../content/auth'
import styles from './Showcase.module.css'

/* Node positions in content/auth.ts live in this coordinate space */
const VIEW = { width: 520, height: 460 }
const HUB = { x: VIEW.width / 2, y: VIEW.height / 2 }

const icons: Record<HubNodeId, ReactNode> = {
  github: <GithubIcon size={18} />,
  slack: <SlackIcon size={18} />,
  agent: <Sparkles size={18} strokeWidth={1.75} />,
  drive: <DriveIcon size={18} />,
  gmail: <GmailIcon size={18} />,
  calendar: <CalendarDays size={18} strokeWidth={1.75} />,
}

export function IntegrationHub() {
  return (
    <div className={styles.hub} aria-hidden="true">
      <svg className={styles.wires} viewBox={`0 0 ${VIEW.width} ${VIEW.height}`}>
        {hubNodes.map((node, index) => {
          const path = `M${node.x} ${node.y} L${HUB.x} ${HUB.y}`
          return (
            <g key={node.id}>
              <path className={styles.wire} d={path} />
              <path
                className={styles.pulse}
                d={path}
                pathLength={100}
                style={{ '--order': index } as CSSProperties}
              />
            </g>
          )
        })}
      </svg>

      {hubNodes.map((node, index) => (
        <div
          key={node.id}
          className={cx(styles.node, styles.settle)}
          style={
            {
              left: `${(node.x / VIEW.width) * 100}%`,
              top: `${(node.y / VIEW.height) * 100}%`,
              '--tilt': `${node.tilt}deg`,
              '--order': index + 1,
            } as CSSProperties
          }
        >
          <span className={cx(styles.nodeIcon, node.id === 'agent' && styles.nodeIconAgent)}>{icons[node.id]}</span>
          <span className={styles.nodeText}>
            <span className={styles.nodeName}>{node.name}</span>
            <span className={styles.nodeDetail}>{node.detail}</span>
          </span>
        </div>
      ))}

      <div className={cx(styles.core, styles.settle)} style={{ '--order': 0 } as CSSProperties}>
        <span className={styles.coreCheck}>
          <Check size={10} strokeWidth={3.5} />
        </span>
        <LogoMark size={34} />
        <span className={styles.coreName}>TicketOS</span>
      </div>
    </div>
  )
}
