import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { DesktopDashboard } from './desktop/DesktopDashboard'
import { PhoneDashboard } from './phone/PhoneDashboard'
import styles from './ProductPreview.module.css'

export function ProductPreview() {
  return (
    <section id="tour" aria-labelledby="tour-title">
      <Container>
        <h2 id="tour-title" className="sr-only">
          Product tour
        </h2>

        <figure className={styles.figure}>
          <div className={styles.phoneLabel} aria-hidden="true">
            <span>Live workspace view</span>
            <Badge tone="done" dot>
              Sync active
            </Badge>
          </div>

          {/* Two renderings of the same screen; CSS shows the one that fits the viewport */}
          <div className={styles.desktop} aria-hidden="true">
            <div className={styles.frame}>
              <DesktopDashboard />
            </div>
          </div>
          <div className={styles.mobile} aria-hidden="true">
            <PhoneDashboard />
          </div>

          <figcaption className="sr-only">
            The TicketOS home dashboard: a to-do list, a running time tracker, weekly activity, tasks you’ve assigned,
            and an AI summary of the active spec document.
          </figcaption>
        </figure>
      </Container>
    </section>
  )
}
