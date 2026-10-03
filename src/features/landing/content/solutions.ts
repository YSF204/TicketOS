import { ChartNoAxesColumn, UsersRound, Zap, type LucideIcon } from 'lucide-react'

export type SolutionTone = 'sticky' | 'signal' | 'agent'

export interface Solution {
  /** The status-quo complaint this replaces — shown struck through. */
  before: string
  title: string
  description: string
  icon: LucideIcon
  tone: SolutionTone
}

export const solutionsContent = {
  title: 'Solve your team’s biggest challenges',
  description: 'Ditch messy spreadsheets, lost Slack threads, and tools that don’t talk to each other.',
  items: [
    {
      before: '“Who’s picking this up?”',
      title: 'Automated task workflows',
      description:
        'New work is routed to the right owner, status updates itself as PRs move, and blockers surface the moment they appear.',
      icon: Zap,
      tone: 'sticky',
    },
    {
      before: '“Everything is P1 again.”',
      title: 'Priority and velocity control',
      description:
        'Rank work against real capacity with built-in burn-up charts, so the team spends its week on what moves the launch.',
      icon: ChartNoAxesColumn,
      tone: 'signal',
    },
    {
      before: '“Quick 45-minute status sync?”',
      title: 'Zero-friction accountability',
      description:
        'An AI-written standup digest lands every morning, so everyone knows who’s on what without another meeting.',
      icon: UsersRound,
      tone: 'agent',
    },
  ] satisfies Solution[],
}
