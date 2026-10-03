import type { NavLink } from './navigation'

export interface FooterColumn {
  title: string
  links: NavLink[]
}

export const footerContent = {
  tagline:
    'The workspace for modern product teams. Think, plan, track and ship high-impact software with an AI assistant that knows your docs.',
  columns: [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'AI assistant', href: '#assistant' },
        { label: 'Time tracker', href: '/time-tracker' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Changelog', href: '/changelog' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API reference', href: '/docs/api' },
        { label: 'Community', href: '/community' },
        { label: 'Productivity guides', href: '/guides' },
        { label: 'Status', href: '/status' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers', badge: 'Hiring' },
        { label: 'Privacy policy', href: '/privacy' },
        { label: 'Terms of service', href: '/terms' },
        { label: 'Security', href: '/security' },
      ],
    },
  ] satisfies FooterColumn[],
  note: 'Built for engineering, design and product teams.',
  social: [
    { label: 'TicketOS on X', href: 'https://x.com', network: 'x' },
    { label: 'TicketOS on GitHub', href: 'https://github.com', network: 'github' },
    { label: 'TicketOS on LinkedIn', href: 'https://www.linkedin.com', network: 'linkedin' },
  ] as const,
}
