import React, {
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
  const target = React.useRef(null)

  const { observation } = useObserverContext()
  React.useEffect(() => {
    if (target.current) {
      target.current.scrollIntoView({ behavior: 'smooth' })
      target.current = null
    }
  }, [observation.height])

  const clickHandler = (e) => {
    target.current = e.target
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
