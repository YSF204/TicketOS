import { useId, useState } from 'react'
import { CircleCheck, FileText, Sparkles } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import { cx } from '@/lib/cx'
import { assistantContent, type AnswerRun } from '../../content/assistant'
import styles from './CopilotPanel.module.css'

function renderRun(run: AnswerRun, index: number) {
  if (typeof run === 'string') return run
  if ('strong' in run) return <strong key={index}>{run.strong}</strong>
  return (
    <sup key={index} className={styles.cite}>
      <span className="sr-only">source </span>
      {run.cite}
    </sup>
  )
}

/** A sample Copilot thread. Picking a suggested question swaps in its cited answer. */
export function CopilotPanel() {
  const { panel, conversations } = assistantContent
  const labelId = useId()
  const [activeId, setActiveId] = useState(conversations[0].id)

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.name}>
          <span className={styles.liveDot} aria-hidden="true" />
          {panel.name}
        </span>
        <span className={styles.indexed}>{panel.indexed}</span>
      </div>

      {/* Every answer is stacked in one grid cell, so the panel keeps the tallest answer's height */}
      <div className={styles.thread} aria-live="polite">
        {conversations.map((conversation) => {
          const isActive = conversation.id === activeId
          return (
            <div
              key={conversation.id}
              className={cx(styles.exchange, isActive && styles.exchangeActive)}
              aria-hidden={!isActive}
            >
              <div className={styles.question}>
                <p className={styles.bubble}>{conversation.question}</p>
                <Avatar initials="AP" size={26} />
              </div>

              <div className={styles.answer}>
                <span className={styles.botMark} aria-hidden="true">
                  <Sparkles size={13} strokeWidth={2.25} />
                </span>
                <div className={styles.answerBody}>
                  <p className={styles.answerText}>{conversation.answer.map(renderRun)}</p>
                  <ol className={styles.sources} aria-label="Sources">
                    {conversation.citations.map((citation, index) => (
                      <li key={citation.file} className={styles.source}>
                        <span className={styles.sourceNumber}>{index + 1}</span>
                        <FileText size={13} strokeWidth={2} aria-hidden="true" />
                        <span className={styles.sourceFile}>{citation.file}</span>
                        <span className={styles.sourceLocation}>{citation.location}</span>
                      </li>
                    ))}
                  </ol>
                  <div className={styles.meta}>
                    <span className={styles.verified}>
                      <CircleCheck size={13} strokeWidth={2.25} aria-hidden="true" />
                      Sources verified
                    </span>
                    <span>Confidence {conversation.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.suggestions}>
        <span id={labelId} className={styles.suggestionsLabel}>
          {panel.suggestionsLabel}
        </span>
        <div role="group" aria-labelledby={labelId} className={styles.chips}>
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              aria-pressed={conversation.id === activeId}
              className={styles.chip}
              onClick={() => setActiveId(conversation.id)}
            >
              {conversation.prompt}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.composer} aria-hidden="true">
        <span>{panel.inputPlaceholder}</span>
        <span className={styles.ask}>Ask</span>
      </div>
    </div>
  )
}
