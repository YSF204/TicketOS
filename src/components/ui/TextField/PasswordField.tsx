import { useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { cx } from '@/lib/cx'
import { TextField, type TextFieldProps } from './TextField'
import styles from './TextField.module.css'

type PasswordFieldProps = Omit<TextFieldProps, 'type' | 'trailing'>

/** Text field with a show/hide toggle. Defaults to a lock icon. */
export function PasswordField({ icon = Lock, ...rest }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <TextField
      {...rest}
      icon={icon}
      type={visible ? 'text' : 'password'}
      trailing={
        <button
          type="button"
          className={styles.toggle}
          aria-label="Show password"
          aria-pressed={visible}
          onClick={() => setVisible((value) => !value)}
        >
          <Eye className={cx(styles.toggleIcon, visible && styles.toggleIconOut)} size={18} strokeWidth={1.75} aria-hidden="true" />
          <EyeOff className={cx(styles.toggleIcon, !visible && styles.toggleIconOut)} size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>
      }
    />
  )
}
