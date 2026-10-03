import type { ReactNode } from 'react'
import { DriveIcon, GithubIcon, SlackIcon } from '@/components/icons/BrandIcons'
import { Container } from '@/components/ui/Container'
import { featuresContent, type FeatureId } from '../../content/features'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import { FeatureCard } from './FeatureCard'
import { SchedulePanel } from './illustrations/SchedulePanel'
import { TeamPanel } from './illustrations/TeamPanel'
import { TimelinePanel } from './illustrations/TimelinePanel'
import { WorkspaceCustomizer } from './illustrations/WorkspaceCustomizer'
import styles from './Features.module.css'

const illustrations: Record<FeatureId, ReactNode> = {
  collaboration: <TeamPanel />,
  time: <SchedulePanel />,
  tracking: <TimelinePanel />,
  workspaces: <WorkspaceCustomizer />,
}

/* Alternating narrow/wide cards so the grid has rhythm instead of four equal boxes */
const layout: Record<FeatureId, string> = {
  collaboration: styles.narrow,
  time: styles.wide,
  tracking: styles.wide,
  workspaces: styles.narrow,
}

export function Features() {
  return (
    <section id="features" className={styles.section} aria-labelledby="features-title">
      <Container>
        <SectionHeading id="features-title" title={featuresContent.title} description={featuresContent.description} />

        <ul className={styles.grid}>
          {featuresContent.items.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              illustration={illustrations[feature.id]}
              className={layout[feature.id]}
            />
          ))}
        </ul>

        <p className={styles.footnote}>
          <span className={styles.footnoteIcons} aria-hidden="true">
            <GithubIcon size={16} />
            <SlackIcon size={16} />
            <DriveIcon size={16} />
          </span>
          {featuresContent.footnote}
        </p>
      </Container>
    </section>
  )
}
