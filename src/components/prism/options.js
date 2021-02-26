import React, {
  useLayoutEffect,
  useCallback,
  useMemo,
  useEffect,
  useState,
  createContext,
  useContext,
} from 'react'
import { css } from '@emotion/react'
import { ControlledToggle } from 'components/Toggle'
import { useObserverContext } from 'utils'

const STORAGE_KEY = 'prism-options'
const PrismContext = createContext()

export function PrismOptionsProvider({ children }) {
  const storedOptions = useMemo(
    () =>
      typeof window !== 'undefined'
        ? window.localStorage.getItem(STORAGE_KEY)
        : '{}',
    []
  )

  const [options, setOptions] = useState(JSON.parse(storedOptions) || {})

  useEffect(
    () => window.localStorage.setItem(STORAGE_KEY, JSON.stringify(options)),
    [options]
  )

  return (
    <PrismContext.Provider value={{ ...options, setOptions }}>
      {children}
    </PrismContext.Provider>
  )
}

export const usePrismOptions = () => useContext(PrismContext)

export function OptionsToggle({ optionKey, text, condition }) {
  const { setOptions, ...options } = usePrismOptions()
  const checked = options[optionKey]
  const [targetTop, setTargetTop] = useState(0)
  const [target, setTarget] = useState(null)

  const restoreScroll = useCallback(() => {
    if (target) {
      target.scrollIntoView()
      window.scrollTo(0, window.scrollY - targetTop)
      setTarget(null)
    }
  }, [target, setTarget, targetTop])

  const { observation } = useObserverContext()
  useLayoutEffect(() => {
    restoreScroll()
  }, [observation.height, restoreScroll])

  const clickHandler = (e) => {
    setTargetTop(e.target.getBoundingClientRect())
    setTarget(e.target)
    setOptions((options) => ({
      ...options,
      [optionKey]: condition && !options[optionKey],
    }))
  }

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin: 0 8px;
      `}
    >
      <em
        css={css`
          font-size: 17px;
          margin-right: 5px;
        `}
      >
        {text}
      </em>
      <ControlledToggle {...{ clickHandler, checked }} />
    </div>
  )
}

OptionsToggle.defaultProps = {
  condition: true,
}
