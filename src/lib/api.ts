import axios from 'axios'

/* Same-origin /api (proxied by Vite in dev) so the httpOnly refresh cookie just works */
export const api = axios.create({ baseURL: '/api' })

export function apiError(error: unknown) {
  return (axios.isAxiosError(error) && error.response?.data?.message) || 'Something went wrong. Please try again.'
}
