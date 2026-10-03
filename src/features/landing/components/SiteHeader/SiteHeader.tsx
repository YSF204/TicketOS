import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { useScrolled } from '@/hooks/useScrolled'
import { cx } from '@/lib/cx'
import { authActions, primaryNav } from '../../content/navigation'
import styles from './SiteHeader.module.css'

export function SiteHeader() {
  const scrolled = useScrolled()

  return (
    <header className={cx(styles.header, scrolled && styles.scrolled)}>
      <Container className={styles.inner}>
        <a href="/" className={styles.brand} aria-label="TicketOS home">
          <Logo />
        </a>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {primaryNav.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                  {link.badge && (
                    <Badge tone="agent" size="sm">
                      {link.badge}
                    </Badge>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ButtonLink href={authActions.signIn.href} variant="ghost" size="sm" className={styles.signIn}>
            {authActions.signIn.label}
          </ButtonLink>
          <ButtonLink href={authActions.signUp.href} size="sm">
            {authActions.signUp.label}
          </ButtonLink>
        </div>
      </Container>
    </header>
  )
}
