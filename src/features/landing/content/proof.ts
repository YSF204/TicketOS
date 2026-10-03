export interface ProofPoint {
  value: string
  label: string
  detail: string
}

export const proofContent = {
  title: 'Trusted by fast-moving teams',
  items: [
    { value: '10×', label: 'Faster task creation', detail: 'Backlogs drafted from your specs' },
    { value: '99.98%', label: 'Uptime', detail: 'Zero-downtime deploys' },
    { value: '150k+', label: 'Tasks closed', detail: 'Across teams in 40+ countries' },
    { value: '4.9/5', label: 'Team satisfaction', detail: 'Average rating from workspace admins' },
  ] satisfies ProofPoint[],
}
