import type { ComponentProps, ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cx } from '@/lib/cx'
import styles from './Checkbox.module.css'

interface CheckboxProps extends Omit<ComponentProps<'input'>, 'type' | 'children'> {
  /** Label content; the whole row toggles the box. */
  children: ReactNode
}

export function Checkbox({ children, className, ...inputProps }: CheckboxProps) {
  return (
    <label className={cx(styles.checkbox, className)}>
      <span className={styles.box}>
        <input type="checkbox" className={styles.input} {...inputProps} />
        <Check className={styles.tick} size={12} strokeWidth={3.25} aria-hidden="true" />
      </span>
      <span className={styles.text}>{children}</span>
    </label>
  )
}
