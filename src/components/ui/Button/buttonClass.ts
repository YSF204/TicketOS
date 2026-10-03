import { cx } from '@/lib/cx'
import styles from './Button.module.css'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'onSignal'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonStyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Stretch to the full width of the parent. */
  block?: boolean
}

/** Class list for anything that should look like a button (buttons, links). */
export function buttonClass(
  { variant = 'primary', size = 'md', block = false }: ButtonStyleProps,
  className?: string,
): string {
  return cx(
    styles.button,
    styles[variant],
    size !== 'md' && styles[size],
    block && styles.block,
    className,
  )
}
