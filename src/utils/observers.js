import { useCallback, useState, useRef, useEffect } from 'react'

function useObserver(constructObserver, targetOptions) {
  const [observation, setObservation] = useState({})
  const ref = useRef()
  useEffect(() => {
    let observer
    let el
    if (ref.current) {
      el = ref.current
      observer = constructObserver(setObservation)
      observer.observe(el, targetOptions)
    }
    return () => observer && observer?.unobserve?.(el)
  }, [targetOptions, constructObserver])

  return [ref, observation]
}

export function useIntersectionObserver(options) {
  const constructObserver = useCallback(
    (setObservation) =>
      new IntersectionObserver((entries) => setObservation(entries), options),
    [options]
  )
  return useObserver(constructObserver)
}

export function useResizeObserver() {
  const constructObserver = useCallback(
    (setObservation) => new ResizeObserver(([entry]) => setObservation(entry)),
    []
  )
  return useObserver(constructObserver)
}

export function useMutationObserver(options = {}) {
  const constructObserver = useCallback(
    (setObservation) =>
      new MutationObserver((mutation) => setObservation(mutation)),
    []
  )
  return useObserver(constructObserver, {
    childList: true,
    attributes: false,
    subtree: false,
    ...options,
  })
}
