import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useSmoothScroll } from '@/lib/useSmoothScroll'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Preloader } from '@/components/Preloader'
import { markRevealed } from '@/lib/reveal'
import Home from '@/pages/Home'
import TalentAdvisory from '@/pages/TalentAdvisory'
import TalentSearch from '@/pages/TalentSearch'
import Clients from '@/pages/Clients'
import About from '@/pages/About'
import Insights from '@/pages/Insights'
import Contact from '@/pages/Contact'

export default function App() {
  useSmoothScroll()
  const location = useLocation()

  return (
    <>
      <Preloader onComplete={markRevealed} />
      <ScrollProgress />
      <Nav />
      {/* Page transition: the outgoing page fades out exactly where the user is
          — no scroll movement while anything is visible. The jump to the top
          happens in onExitComplete, i.e. in the blank frame between the old
          page unmounting and the new one fading in. (A scroll-on-pathname
          effect used to fire while the old page was still on screen, which
          read as a visible snap-to-top before the fade.) */}
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'auto' })}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/talent-advisory" element={<TalentAdvisory />} />
            <Route path="/talent-search" element={<TalentSearch />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/about" element={<About />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
