import { Container } from '@/components/ui/Container'
import { cx } from '@/lib/cx'
import { solutionsContent } from '../../content/solutions'
import { SectionHeading } from '../SectionHeading/SectionHeading'
import styles from './Solutions.module.css'

export function Solutions() {
  return (
    <section id="solutions" className={styles.section} aria-labelledby="solutions-title">
      <Container>
        <SectionHeading id="solutions-title" title={solutionsContent.title} description={solutionsContent.description} />

        <ul className={styles.panel}>
          {solutionsContent.items.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.title} className={styles.item}>
                <span className={cx(styles.icon, styles[item.tone])} aria-hidden="true">
                  <Icon size={18} strokeWidth={2} />
                </span>
                {/* The complaint this closes out, struck through like a resolved ticket */}
                <p className={styles.before}>
                  <span className="sr-only">Instead of </span>
                  <s>{item.before}</s>
                </p>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
