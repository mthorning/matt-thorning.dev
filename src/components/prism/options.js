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

const STORAGE_KEY = 'prism-options'
const PrismContext = createContext()

export function PrismOptionsProvider({ children, mutation }) {
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
    <PrismContext.Provider value={{ ...options, setOptions, mutation }}>
      {children}
    </PrismContext.Provider>
  )
}

export const usePrismOptions = () => useContext(PrismContext)

export function OptionsToggle({ optionKey, text, condition }) {
  const { mutation, setOptions, ...options } = usePrismOptions()
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

  useLayoutEffect(() => {
    restoreScroll()
  }, [mutation, restoreScroll])

  const clickHandler = (e) => {
    const rect = e.target.getBoundingClientRect()
    setTargetTop(rect?.top)
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
