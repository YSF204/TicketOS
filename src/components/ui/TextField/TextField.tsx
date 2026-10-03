import { useId, type ComponentProps, type ReactNode } from 'react'
import { CircleAlert, type LucideIcon } from 'lucide-react'
import { cx } from '@/lib/cx'
import styles from './TextField.module.css'

export interface TextFieldProps extends Omit<ComponentProps<'input'>, 'size'> {
  label: string
  /** Leading icon inside the input. */
  icon?: LucideIcon
  /** Helper content under the input (text or a small widget). */
  hint?: ReactNode
  /** Validation message; marks the input invalid when set. */
  error?: string
  /** Sits at the end of the label row, e.g. a "Forgot password?" link. */
  labelAction?: ReactNode
  /** Control inside the input's trailing edge, e.g. a visibility toggle. */
  trailing?: ReactNode
}

export function TextField({
  label,
  icon: Icon,
  hint,
  error,
  labelAction,
  trailing,
  className,
  id,
  ...inputProps
}: TextFieldProps) {
  const autoId = useId()
  const inputId = id ?? autoId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const describedBy = cx(error && errorId, hint ? hintId : undefined) || undefined

  return (
    <div className={cx(styles.field, className)}>
      <div className={styles.labelRow}>
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
        {labelAction}
      </div>

      <div className={cx(styles.control, Icon && styles.withIcon, trailing != null && styles.withTrailing)}>
        {Icon && <Icon className={styles.icon} size={18} strokeWidth={1.75} aria-hidden="true" />}
        <input
          id={inputId}
          className={styles.input}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...inputProps}
        />
        {trailing && <div className={styles.trailing}>{trailing}</div>}
      </div>

      {error && (
        <p id={errorId} className={styles.error}>
          <CircleAlert size={14} strokeWidth={2} aria-hidden="true" />
          {error}
        </p>
      )}
      {hint && (
        <div id={hintId} className={styles.hint}>
          {hint}
        </div>
      )}
    </div>
  )
}
