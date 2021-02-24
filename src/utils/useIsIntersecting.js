import { useState, useRef, useEffect } from 'react'

export function useIsIntersecting(options) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef()
  useEffect(() => {
    let observer
    let el
    if (ref.current) {
      el = ref.current
      observer = new IntersectionObserver(([entry]) => {
        if (entry.ratio <= 0) return
        setIsIntersecting(entry.isIntersecting)
      }, options)
      observer.observe(el)
    }
    return () => observer && observer.unobserve(el)
  }, [])

  return [ref, isIntersecting]
}
