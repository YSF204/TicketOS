import { CallToAction } from './components/CallToAction/CallToAction'
import { DocAssistant } from './components/DocAssistant/DocAssistant'
import { Features } from './components/Features/Features'
import { Hero } from './components/Hero/Hero'
import { ProductPreview } from './components/ProductPreview/ProductPreview'
import { ProofStrip } from './components/ProofStrip/ProofStrip'
import { SiteFooter } from './components/SiteFooter/SiteFooter'
import { SiteHeader } from './components/SiteHeader/SiteHeader'
import { Solutions } from './components/Solutions/Solutions'
import styles from './LandingPage.module.css'

export function LandingPage() {
  return (
    <>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProductPreview />
        <Solutions />
        <Features />
        <DocAssistant />
        <ProofStrip />
        <CallToAction />
      </main>
      <SiteFooter />
    </>
  )
}
