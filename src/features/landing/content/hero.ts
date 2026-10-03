export const heroContent = {
  headline: ['Think, plan, and track', 'all in one place'],
  description:
    'Manage tasks across every project, turn specs into sprint backlogs with AI, and see what’s blocked before standup.',
  assurances: ['Free for 14 days', 'No credit card required', 'Cancel anytime'],
  stickyNote: 'Turn the launch doc into tickets before Friday standup!',
  reminder: {
    label: 'Reminders',
    tag: 'Meeting',
    title: 'Today’s standup',
    detail: 'Sync with the core product team',
    time: '10:00 – 10:30 AM',
  },
  todaysTasks: {
    title: 'Today’s tasks',
    link: 'Active sprint',
    items: [
      { label: 'Sprint ideas', progress: 60, tone: 'signal', dot: 'sticky' },
      { label: 'Design tokens', progress: 100, tone: 'done', dot: 'done' },
    ],
  },
  integrations: {
    title: '100+ integrations',
    status: 'Connected',
  },
  calendar: { month: 'Oct', day: '5' },
} as const
