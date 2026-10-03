import type { ComponentProps } from 'react'
import { cx } from '@/lib/cx'
import styles from './Container.module.css'

/** Centres content at the site's max width with responsive side gutters. */
export function Container({ className, ...rest }: ComponentProps<'div'>) {
  return <div className={cx(styles.container, className)} {...rest} />
}
