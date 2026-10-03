import { Check, Sparkles } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { assistantContent } from '../../content/assistant'
import { CopilotPanel } from './CopilotPanel'
import styles from './DocAssistant.module.css'

export function DocAssistant() {
  const [question, promise] = assistantContent.title

  return (
    <section id="assistant" className={styles.section} aria-labelledby="assistant-title">
      <Container>
        <div className={styles.room}>
          <div className={styles.copy}>
            <span className={styles.badge}>
              <Sparkles size={12} strokeWidth={2.5} aria-hidden="true" />
              {assistantContent.badge}
            </span>
            <h2 id="assistant-title" className={styles.title}>
              {question} {promise}
            </h2>
            <p className={styles.description}>{assistantContent.description}</p>
            <ul className={styles.capabilities}>
              {assistantContent.capabilities.map((capability) => (
                <li key={capability}>
                  <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                  {capability}
                </li>
              ))}
            </ul>
          </div>

          <CopilotPanel />
        </div>
      </Container>
    </section>
  )
}
