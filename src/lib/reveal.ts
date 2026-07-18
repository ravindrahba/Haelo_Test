// One-shot "the preloader has fully dissolved" signal.
//
// The hero must not start consuming slide time while the preloader still covers
// it — otherwise slide 1's autoplay window is part-spent before the user can
// see it (it only showed full-length from the second loop). The preloader calls
// markRevealed() once; late subscribers (e.g. navigating back to Home) fire
// immediately.

let done = false
const listeners = new Set<() => void>()

export function markRevealed(): void {
  done = true
  listeners.forEach((cb) => cb())
  listeners.clear()
}

export function isRevealed(): boolean {
  return done
}

/** Runs `cb` when the reveal happens (or immediately if it already has). */
export function onRevealed(cb: () => void): () => void {
  if (done) {
    cb()
    return () => {}
  }
  listeners.add(cb)
  return () => {
    listeners.delete(cb)
  }
}
