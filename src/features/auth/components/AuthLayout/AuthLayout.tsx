import type { ReactNode } from 'react'
import { LifeBuoy } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { authLinks } from '../../content/auth'
import styles from './AuthLayout.module.css'

const year = new Date().getFullYear()

interface AuthLayoutProps {
  /** The form column. */
  children: ReactNode
  /** Product visual shown beside the form from 64rem up. */
  showcase: ReactNode
}

export function AuthLayout({ children, showcase }: AuthLayoutProps) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href={authLinks.home} className={styles.brand} aria-label="TicketOS home">
          <Logo />
        </a>
        <a href={authLinks.help} className={styles.help}>
          <LifeBuoy size={16} strokeWidth={1.75} aria-hidden="true" />
          Need help?
        </a>
      </header>

      <div className={styles.body}>
        <main className={styles.main}>
          <div className={styles.column}>{children}</div>

          <footer className={styles.footer}>
            <span>© {year} TicketOS</span>
            <nav aria-label="Legal">
              <ul className={styles.footerLinks}>
                <li>
                  <a href={authLinks.privacy}>Privacy</a>
                </li>
                <li>
                  <a href={authLinks.terms}>Terms</a>
                </li>
                <li>
                  <a href={authLinks.status}>Status</a>
                </li>
              </ul>
            </nav>
          </footer>
        </main>

        <aside className={styles.showcase}>{showcase}</aside>
      </div>
    </div>
  )
}
