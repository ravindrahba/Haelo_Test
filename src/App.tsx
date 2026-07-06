import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useSmoothScroll } from '@/lib/useSmoothScroll'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Services from '@/pages/Services'
import SectorsPage from '@/pages/SectorsPage'
import Network from '@/pages/Network'
import Careers from '@/pages/Careers'
import Contact from '@/pages/Contact'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  useSmoothScroll()
  const location = useLocation()

  return (
    <>
      <ScrollProgress />
      <Nav />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/sectors" element={<SectorsPage />} />
            <Route path="/network" element={<Network />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}
