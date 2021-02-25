import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from 'react'

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
  }, [options])

  return [ref, isIntersecting]
}

export function useIsResizing() {
  const [isResizing, setIsResizing] = useState({})
  const ref = useRef()
  useEffect(() => {
    let observer
    let el
    if (ref.current) {
      el = ref.current
      observer = new ResizeObserver(([entry]) => {
        setIsResizing(entry.contentRect)
      })
      observer.observe(el)
    }
    return () => observer && observer.unobserve(el)
  }, [])

  return [ref, isResizing]
}

const ObserverContext = createContext()

export const useObserverContext = () => useContext(ObserverContext)

export function ObserverProvider({ children, useObserver }) {
  const [ref, observation] = useObserver()
  return (
    <ObserverContext.Provider value={{ observation }}>
      <div ref={ref}>{children}</div>
    </ObserverContext.Provider>
  )
}
