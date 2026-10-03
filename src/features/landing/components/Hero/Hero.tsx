import { Check } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { LogoMark } from '@/components/ui/Logo'
import { heroContent } from '../../content/hero'
import { authActions } from '../../content/navigation'
import { HeroArtifactsBottom, HeroArtifactsTop } from './HeroArtifacts'
import styles from './Hero.module.css'

export function Hero() {
  const [firstLine, secondLine] = heroContent.headline

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Container className={styles.stage}>
        <HeroArtifactsTop />

        <div className={styles.copy}>
          <span className={styles.appTile} aria-hidden="true">
            <LogoMark size={26} />
          </span>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.titleLine}>{firstLine}</span> <span className={styles.titleLine}>{secondLine}</span>
          </h1>
          <p className={styles.description}>{heroContent.description}</p>
          <div className={styles.actions}>
            <ButtonLink href={authActions.signUp.href} size="lg" className={styles.cta}>
              {authActions.signUp.label}
            </ButtonLink>
          </div>
          <ul className={styles.assurances}>
            {heroContent.assurances.map((item) => (
              <li key={item}>
                <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <HeroArtifactsBottom />
      </Container>
    </section>
  )
}
