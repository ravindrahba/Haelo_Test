import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useSmoothScroll } from '@/lib/useSmoothScroll'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { Preloader } from '@/components/Preloader'
import Home from '@/pages/Home'
import TalentAdvisory from '@/pages/TalentAdvisory'
import TalentSearch from '@/pages/TalentSearch'
import Clients from '@/pages/Clients'
import About from '@/pages/About'
import Insights from '@/pages/Insights'
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
      <Preloader />
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
