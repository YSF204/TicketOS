import {
  ChartColumn,
  Component,
  House,
  Inbox,
  Lightbulb,
  ListChecks,
  ShieldCheck,
  Sparkles,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import type { AvatarColor } from '@/components/ui/Avatar'
import type { BadgeTone } from '@/components/ui/Badge'
import type { ProgressTone } from '@/components/ui/Progress'

/* Sample workspace shown in the product preview. Purely illustrative. */

export const previewUser = {
  firstName: 'Amanda',
  shortName: 'Amanda P.',
  initials: 'AP',
  date: 'Monday, October 5',
  sprint: 'Growth marketing sprint',
  projectCount: 3,
}

export interface SidebarItem {
  label: string
  icon: LucideIcon
  active?: boolean
  count?: number
  countTone?: 'neutral' | 'signal'
  tag?: string
}

export const sidebarItems: SidebarItem[] = [
  { label: 'Home', icon: House, active: true },
  { label: 'My tasks', icon: ListChecks, count: 22 },
  { label: 'Inbox', icon: Inbox, count: 11, countTone: 'signal' },
  { label: 'Reporting', icon: ChartColumn },
  { label: 'AI doc Q&A', icon: Sparkles, tag: 'AI' },
]

export const sidebarWorkspaces: { name: string; color: 'alert' | 'done' | 'signal' }[] = [
  { name: 'Branding and identity', color: 'alert' },
  { name: 'Engineering sprint 42', color: 'done' },
  { name: 'Product launch Q4', color: 'signal' },
]

export const seatUsage = { plan: 'Pro team plan', used: 8, total: 10 }

export interface TodoItem {
  label: string
  done: boolean
  tag?: { label: string; tone: BadgeTone }
}

export const todos: TodoItem[] = [
  { label: 'Finish the sales deck for the 2:00 PM client call', done: false, tag: { label: 'Today', tone: 'sticky' } },
  { label: 'Send follow-up emails to new leads', done: true },
  { label: 'Review and approve the Q4 marketing budget', done: false },
  { label: 'Write release notes for v2.4', done: true },
]

/** 04:21:58 */
export const trackerStartSeconds = 4 * 3600 + 21 * 60 + 58

export const weeklyActivity = {
  goal: 73,
  stats: [
    { label: 'Working hours', value: '29/40 hrs', tone: 'ink' },
    { label: 'Tasks completed', value: '8/12', tone: 'signal' },
    { label: 'Projects shipped', value: '4/7', tone: 'sticky' },
  ] as const,
}

export interface AssignedTask {
  id: string
  title: string
  progress: number
  tone: ProgressTone
  icon: LucideIcon
  iconTone: 'sticky' | 'done' | 'alert'
  assignee: { initials: string; color: AvatarColor }
}

export const assignedTasks: AssignedTask[] = [
  {
    id: 'TOS-214',
    title: 'New ideas for campaign launch',
    progress: 60,
    tone: 'signal',
    icon: Lightbulb,
    iconTone: 'sticky',
    assignee: { initials: 'MK', color: 'violet' },
  },
  {
    id: 'TOS-198',
    title: 'Interactive pricing table component',
    progress: 100,
    tone: 'done',
    icon: Component,
    iconTone: 'done',
    assignee: { initials: 'AL', color: 'signal' },
  },
  {
    id: 'TOS-231',
    title: 'Q3 security audit compliance doc',
    progress: 30,
    tone: 'sticky',
    icon: ShieldCheck,
    iconTone: 'alert',
    assignee: { initials: 'JF', color: 'agent' },
  },
]

export const assignedTabs = ['Upcoming', 'Overdue', 'Completed']

export const docSummary = {
  file: 'Q3_Product_Specs_v2.pdf',
  meta: '48 pages, uploaded 2h ago',
  summary: 'The main sprint goal is cutting checkout friction by 24% before the October 15 launch.',
}

/* Phone */

export const phoneStats = { done: 9, total: 12 }

export const phoneUpNext: { title: string; time: string; attendees: { initials: string; color: AvatarColor }[] } = {
  title: 'Sprint planning',
  time: 'Today, 2:00 – 3:00 PM',
  attendees: [
    { initials: 'JF', color: 'agent' },
    { initials: 'MK', color: 'violet' },
    { initials: 'AL', color: 'done' },
  ],
}

export const phoneBacklog: { label: string; done: boolean; tag: { label: string; tone: BadgeTone } }[] = [
  { label: 'Calculate quarterly retention cohorts', done: true, tag: { label: 'Done', tone: 'done' } },
  { label: 'Review Q3 paid ads budget and ROI', done: false, tag: { label: 'Urgent', tone: 'alert' } },
  { label: 'Sync GitHub PRs to the sprint board', done: false, tag: { label: 'In review', tone: 'sticky' } },
]

export const phoneTabs: { label: string; icon: LucideIcon; active?: boolean }[] = [
  { label: 'Home', icon: House, active: true },
  { label: 'Tasks', icon: ListChecks },
  { label: 'Copilot', icon: Sparkles },
  { label: 'Profile', icon: UserRound },
]
