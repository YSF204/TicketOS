import { useEffect, useState } from 'react'

function formatDuration(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':')
}

/**
 * A running stopwatch that starts from `initialSeconds` and returns `HH:MM:SS`.
 * Elapsed time is derived from the clock, so throttled background tabs don't drift.
 */
export function useStopwatch(initialSeconds: number): string {
  const [elapsed, setElapsed] = useState(initialSeconds)

  useEffect(() => {
    const startedAt = Date.now() - initialSeconds * 1000
    const id = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000))
    }, 1000)
    return () => window.clearInterval(id)
  }, [initialSeconds])

  return formatDuration(elapsed)
}
