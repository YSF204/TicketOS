import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { Check } from 'lucide-react'
import { cx } from '@/lib/cx'
import styles from './WorkspaceCustomizer.module.css'

const tabs = [
  { id: 'themes', label: 'Themes' },
  { id: 'widgets', label: 'Widgets' },
  { id: 'board', label: 'Board view' },
] as const

type TabId = (typeof tabs)[number]['id']

const accents = [
  { name: 'Signal blue', value: '#2563eb' },
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Emerald', value: '#059669' },
  { name: 'Amber', value: '#d97706' },
]

const widgetOptions = [
  { id: 'tracker', label: 'Time tracker' },
  { id: 'activity', label: 'Activity overview' },
  { id: 'digest', label: 'AI morning digest' },
] as const

type WidgetId = (typeof widgetOptions)[number]['id']

const boardColumns = [
  { name: 'To do', cards: [{ id: 'TOS-240', title: 'Onboarding' }, { id: 'TOS-244', title: 'Launch copy' }] },
  { name: 'In progress', cards: [{ id: 'TOS-214', title: 'Campaign', active: true }] },
  { name: 'Done', cards: [{ id: 'TOS-198', title: 'Pricing table' }, { id: 'TOS-187', title: 'Auth v3' }] },
]

/** A small, working settings panel: pick an accent, toggle widgets, peek at the board. */
export function WorkspaceCustomizer() {
  const id = useId()
  const [activeTab, setActiveTab] = useState<TabId>('themes')
  const [accent, setAccent] = useState(accents[0].value)
  const [enabledWidgets, setEnabledWidgets] = useState<Record<WidgetId, boolean>>({
    tracker: true,
    activity: true,
    digest: false,
  })
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab)

  // Arrow keys move between tabs and select them (WAI-ARIA tabs, automatic activation)
  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const lastIndex = tabs.length - 1
    const keyTargets: Record<string, number | undefined> = {
      ArrowRight: activeIndex === lastIndex ? 0 : activeIndex + 1,
      ArrowLeft: activeIndex === 0 ? lastIndex : activeIndex - 1,
      Home: 0,
      End: lastIndex,
    }
    const nextIndex = keyTargets[event.key]

    if (nextIndex === undefined) return
    event.preventDefault()
    setActiveTab(tabs[nextIndex].id)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <div className={styles.customizer} style={{ '--accent': accent } as CSSProperties}>
      <div
        role="tablist"
        aria-label="Workspace settings"
        className={styles.tabs}
        style={{ '--index': activeIndex } as CSSProperties}
        onKeyDown={handleTabKeyDown}
      >
        <span className={styles.indicator} aria-hidden="true" />
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              tabRefs.current[index] = element
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${tab.id}`}
            aria-selected={tab.id === activeTab}
            aria-controls={`${id}-panel-${tab.id}`}
            tabIndex={tab.id === activeTab ? 0 : -1}
            className={styles.tab}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panels share one grid cell so switching tabs never changes the card's height */}
      <div className={styles.panels}>
        <div
          role="tabpanel"
          id={`${id}-panel-themes`}
          aria-labelledby={`${id}-tab-themes`}
          className={cx(styles.panel, activeTab === 'themes' && styles.panelActive)}
        >
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Accent color</legend>
            <div className={styles.swatches}>
              {accents.map((option) => (
                <label key={option.value} className={styles.swatch} style={{ '--swatch': option.value } as CSSProperties}>
                  <input
                    type="radio"
                    name={`${id}-accent`}
                    value={option.value}
                    checked={accent === option.value}
                    onChange={() => setAccent(option.value)}
                    className={styles.swatchInput}
                  />
                  <Check size={14} strokeWidth={3} className={styles.swatchCheck} aria-hidden="true" />
                  <span className="sr-only">{option.name}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className={styles.preview} aria-hidden="true">
            <span className={styles.previewDot} />
            <span className={styles.previewName}>Sprint 42</span>
            <span className={styles.previewHex}>{accent}</span>
            <span className={styles.previewButton}>New task</span>
          </div>
        </div>

        <div
          role="tabpanel"
          id={`${id}-panel-widgets`}
          aria-labelledby={`${id}-tab-widgets`}
          className={cx(styles.panel, activeTab === 'widgets' && styles.panelActive)}
        >
          <ul className={styles.toggles}>
            {widgetOptions.map((option) => (
              <li key={option.id}>
                <label className={styles.toggleRow}>
                  {option.label}
                  <input
                    type="checkbox"
                    role="switch"
                    checked={enabledWidgets[option.id]}
                    onChange={(event) =>
                      setEnabledWidgets((current) => ({ ...current, [option.id]: event.target.checked }))
                    }
                    className={styles.switch}
                  />
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div
          role="tabpanel"
          id={`${id}-panel-board`}
          aria-labelledby={`${id}-tab-board`}
          tabIndex={0}
          className={cx(styles.panel, activeTab === 'board' && styles.panelActive)}
        >
          <div className={styles.board}>
            {boardColumns.map((column) => (
              <div key={column.name} className={styles.column}>
                <span className={styles.columnName}>
                  {column.name}
                  <span className={styles.columnCount}>{column.cards.length}</span>
                </span>
                {column.cards.map((card) => (
                  <span key={card.id} className={cx(styles.boardCard, 'active' in card && styles.boardCardActive)}>
                    <span className={styles.boardCardTitle}>{card.title}</span>
                    <span className={styles.boardCardId}>{card.id}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
