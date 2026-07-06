import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// `?static` forces prefers-reduced-motion — used only for stable screenshots.
if (new URLSearchParams(window.location.search).has('static')) {
  const orig = window.matchMedia.bind(window)
  window.matchMedia = ((q: string) =>
    q.includes('prefers-reduced-motion')
      ? {
          matches: true,
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
