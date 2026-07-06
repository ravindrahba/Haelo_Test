import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

/**
 * Motion policy.
 *
 * The HAELO experience is animation-led, so by default we deliver the same
 * signature motion to every visitor regardless of their OS "reduce motion"
 * setting — otherwise reviewers with that setting enabled (as one did) see a
 * completely static site. We pin the `prefers-reduced-motion` media query to a
 * definitive answer here, before React renders, so both our components and
 * framer-motion read a consistent value.
 *
 *   default        → motion ON  (matches:false)
 *   ?static        → motion OFF (matches:true)  — used for stable screenshots
 *   ?reducedmotion → honour the visitor's real OS preference
 */
const params = new URLSearchParams(window.location.search)
if (!params.has('reducedmotion')) {
  const forceReduced = params.has('static')
  const orig = window.matchMedia.bind(window)
  window.matchMedia = ((q: string) =>
    q.includes('prefers-reduced-motion')
      ? {
          matches: forceReduced,
          media: q,
          onchange: null,
          addEventListener() {},
          removeEventListener() {},
          addListener() {},
          removeListener() {},
          dispatchEvent() {
            return false
          },
        }
      : orig(q)) as typeof window.matchMedia
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
