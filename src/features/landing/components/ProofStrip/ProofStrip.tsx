import { Container } from '@/components/ui/Container'
import { proofContent } from '../../content/proof'
import styles from './ProofStrip.module.css'

export function ProofStrip() {
  return (
    <section className={styles.section} aria-labelledby="proof-title">
      <Container>
        <h2 id="proof-title" className={styles.title}>
          {proofContent.title}
        </h2>
        <dl className={styles.grid}>
          {proofContent.items.map((item) => (
            <div key={item.label} className={styles.item}>
              <dt className={styles.label}>{item.label}</dt>
              <dd className={styles.value}>{item.value}</dd>
              <dd className={styles.detail}>{item.detail}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}
