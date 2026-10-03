export const authLinks = {
  home: '/',
  signIn: '/login',
  signUp: '/signup',
  forgotPassword: '/forgot-password',
  help: '/help',
  terms: '/terms',
  privacy: '/privacy',
  status: '/status',
}

export const loginContent = {
  pageTitle: 'Sign in – TicketOS',
  title: 'Welcome back',
  description: 'Sign in to pick up your sprint where your team left off.',
  submit: 'Sign in',
  remember: 'Keep me signed in on this device',
  switchPrompt: 'New to TicketOS?',
  switchAction: 'Create an account',
  showcase: {
    tag: 'Live sync',
    title: 'Every tool your team uses, wired into one board',
    description:
      'Pull requests, threads, and spec docs flow into TicketOS, so tickets stay current without anyone chasing updates.',
  },
}

export const signupContent = {
  pageTitle: 'Create your account – TicketOS',
  tag: 'Free for 14 days',
  title: 'Create your TicketOS account',
  description: 'Set up your workspace and plan your first sprint in minutes.',
  submit: 'Create account',
  assurance: 'No credit card required. Cancel anytime.',
  switchPrompt: 'Already have an account?',
  switchAction: 'Sign in',
  passwordRule: 'At least 8 characters',
  showcase: {
    tag: 'AI sprint planning',
    title: 'Turn a spec into a sprint backlog',
    description:
      'Drop in a PRD and TicketOS drafts the tickets, estimates, and owners. Your team reviews, then ships.',
  },
}

export const hubNodes = [
  { id: 'github', name: 'GitHub', detail: 'Pull requests', x: 128, y: 72, tilt: -1.5 },
  { id: 'slack', name: 'Slack', detail: 'Daily digest', x: 400, y: 84, tilt: 1.5 },
  { id: 'agent', name: 'Triage agent', detail: 'Sorts new tickets', x: 104, y: 238, tilt: 1 },
  { id: 'drive', name: 'Drive', detail: 'Spec docs', x: 428, y: 250, tilt: -1 },
  { id: 'gmail', name: 'Gmail', detail: 'Email to ticket', x: 148, y: 396, tilt: 1.5 },
  { id: 'calendar', name: 'Calendar', detail: 'Milestones', x: 384, y: 392, tilt: -2 },
] as const

export type HubNodeId = (typeof hubNodes)[number]['id']

export const sprintBoard = {
  note: 'Split TOS-812 in two. It’s 13 points and blocks the release.',
  noteAuthor: 'Sprint agent',
  name: 'Sprint 24',
  status: 'Active',
  goal: 'v2.4 release, 4 days left',
  velocity: { value: 84, label: '42 of 50 pts' },
  tickets: [
    { id: 'TOS-812', title: 'Webhook event dispatcher', status: 'In review', tone: 'signal' },
    { id: 'TOS-813', title: 'Index tuning for live telemetry', status: 'In progress', tone: 'sticky' },
    { id: 'TOS-814', title: 'Onboarding email sequence', status: 'Drafting', tone: 'agent' },
  ],
  team: [
    { initials: 'AP', color: 'signal' },
    { initials: 'MK', color: 'slate' },
    { initials: 'SL', color: 'amber' },
  ],
  extraMembers: 4,
  synced: 'Synced 3m ago',
  integrations: ['GitHub PR sync', 'Slack alerts'],
} as const
