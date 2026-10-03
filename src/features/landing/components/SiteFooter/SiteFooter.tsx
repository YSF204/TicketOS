import { GithubIcon, LinkedinIcon, XIcon } from '@/components/icons/BrandIcons'
import { Badge } from '@/components/ui/Badge'
import { Container } from '@/components/ui/Container'
import { Logo } from '@/components/ui/Logo'
import { footerContent } from '../../content/footer'
import styles from './SiteFooter.module.css'

const socialIcons = { x: XIcon, github: GithubIcon, linkedin: LinkedinIcon }
const currentYear = new Date().getFullYear()

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="/" className={styles.logoLink} aria-label="TicketOS home">
              <Logo />
            </a>
            <p className={styles.tagline}>{footerContent.tagline}</p>
          </div>

          <nav className={styles.columns} aria-label="Footer">
            {footerContent.columns.map((column) => (
              <div key={column.title}>
                <h2 className={styles.columnTitle}>{column.title}</h2>
                <ul className={styles.links}>
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className={styles.link}>
                        {link.label}
                        {link.badge && (
                          <Badge tone="done" size="sm">
                            {link.badge}
                          </Badge>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} TicketOS, Inc. All rights reserved.</p>
          <p className={styles.note}>{footerContent.note}</p>
          <ul className={styles.social}>
            {footerContent.social.map((item) => {
              const Icon = socialIcons[item.network]
              return (
                <li key={item.network}>
                  <a href={item.href} className={styles.socialLink} aria-label={item.label} rel="noreferrer" target="_blank">
                    <Icon size={16} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </footer>
  )
}
