import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { callToActionContent } from '../../content/callToAction'
import { authActions } from '../../content/navigation'
import styles from './CallToAction.module.css'

/** The closing call to action, cut like a ticket with a tear-off stub. */
export function CallToAction() {
  const { title, description, stub } = callToActionContent

  return (
    <section className={styles.section} aria-labelledby="cta-title">
      <Container>
        <div className={styles.shadow}>
          <div className={styles.ticket}>
            <div className={styles.main}>
              <h2 id="cta-title" className={styles.title}>
                {title}
              </h2>
              <p className={styles.description}>{description}</p>
              <div className={styles.actions}>
                <ButtonLink href={authActions.signUp.href} variant="inverse" size="lg" className={styles.action}>
                  {authActions.signUp.label}
                </ButtonLink>
                <ButtonLink href={authActions.demo.href} variant="onSignal" size="lg" className={styles.action}>
                  {authActions.demo.label}
                </ButtonLink>
              </div>
            </div>

            <div className={styles.stub}>
              <span className={styles.stubLabel}>{stub.eyebrow}</span>
              <span className={styles.ticketId}>{stub.ticketId}</span>
              <span className={styles.stubNote}>{stub.note}</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
