export type FeatureId = 'collaboration' | 'time' | 'tracking' | 'workspaces'

export interface Feature {
  id: FeatureId
  title: string
  description: string
}

export const featuresContent = {
  title: 'Keep everything in one place',
  description:
    'Stop stitching a sprint together from five different tools. Workspaces, schedules, timelines and settings live side by side.',
  items: [
    {
      id: 'collaboration',
      title: 'Seamless collaboration',
      description: 'Invite your team, share boards, and see who’s working on what in real time.',
    },
    {
      id: 'time',
      title: 'Time management tools',
      description: 'Focus timers, deadline reminders and a live workload view keep the week realistic.',
    },
    {
      id: 'tracking',
      title: 'Advanced task tracking',
      description: 'A bird’s-eye timeline of every sprint, roadmap item and delivery milestone.',
    },
    {
      id: 'workspaces',
      title: 'Customizable workspaces',
      description: 'Pick your accent, choose the widgets you need, and switch between list and board views.',
    },
  ] satisfies Feature[],
  footnote: 'Plus two-way sync with GitHub, Slack and Google Drive.',
}
