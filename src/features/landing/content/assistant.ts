export interface Citation {
  file: string
  location: string
}

/** An answer is a list of text runs; a number marks a citation footnote. */
export type AnswerRun = string | { cite: number } | { strong: string }

export interface Conversation {
  id: string
  /** Short label for the suggestion chip. */
  prompt: string
  question: string
  answer: AnswerRun[]
  citations: Citation[]
  confidence: number
}

export const assistantContent = {
  badge: 'Document Q&A',
  title: ['Ask questions to your project docs.', 'Get cited answers in seconds.'],
  description:
    'Upload PRDs, customer interviews and API specs. TicketOS indexes them, so nobody on the team has to ask “where’s the latest spec?” again.',
  capabilities: [
    'Drafts user stories from your PRDs',
    'Summarizes sprint blockers on request',
    'Links every answer to its source page',
  ],
  panel: {
    name: 'TicketOS Copilot',
    indexed: '3 docs indexed',
    suggestionsLabel: 'Try asking',
    inputPlaceholder: 'Ask anything about your attached docs…',
  },
  conversations: [
    {
      id: 'latency',
      prompt: 'Checkout API target',
      question: 'What’s the target response time for the checkout API?',
      answer: [
        'Checkout requests must stay under ',
        { strong: '300 ms at p99' },
        ', even at peak load.',
        { cite: 1 },
        ' The spec also calls for a fallback queue if the payment provider times out.',
        { cite: 2 },
      ],
      citations: [
        { file: 'PRD_v3_Architecture.pdf', location: 'Page 14' },
        { file: 'Payments_runbook.md', location: 'Section 3' },
      ],
      confidence: 99,
    },
    {
      id: 'auth',
      prompt: 'Auth API deadline',
      question: 'When is the v3 Auth API due, and what has to ship with it?',
      answer: [
        'It’s due ',
        { strong: 'Friday, October 23' },
        '. Launch scope is OAuth 2.0 with PKCE and tenant-scoped JWTs.',
        { cite: 1 },
        ' SSO is listed as a follow-up, not a launch blocker.',
        { cite: 2 },
      ],
      citations: [
        { file: 'Roadmap_Q4.pdf', location: 'Page 4' },
        { file: 'Auth_v3_spec.md', location: 'Scope' },
      ],
      confidence: 97,
    },
    {
      id: 'blockers',
      prompt: 'Sprint 42 blockers',
      question: 'What’s blocking Sprint 42 right now?',
      answer: [
        'Two tickets. ',
        { strong: 'TOS-231' },
        ' is waiting on the security review, and ',
        { strong: 'TOS-244' },
        ' needs final copy from marketing.',
        { cite: 1 },
        ' Both owners were flagged in Monday’s standup notes.',
        { cite: 2 },
      ],
      citations: [
        { file: 'Sprint 42 board', location: 'Live' },
        { file: 'Standup_notes_Oct5.md', location: 'Blockers' },
      ],
      confidence: 98,
    },
  ] satisfies Conversation[],
}
