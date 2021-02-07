import React, { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { FaSun, FaMoon } from 'react-icons/fa'
import { createMachine, useMachine, useTheme } from 'utils'
import Toggle from '../Toggle'

const SPEED = 500

const switchTheme = (theme) => () => window.__setPreferredTheme(theme)

const machine = createMachine(
  ({ state, transition, delay, invoke, action }) => ({
    dark: state(transition('light', 'toLight')),
    toDark: invoke(
      delay(SPEED),
      transition('done', 'dark', action(switchTheme('dark')))
    ),
    toLight: invoke(
      delay(SPEED),
      transition('done', 'light', action(switchTheme('light')))
    ),
    light: state(transition('dark', 'toDark')),
  })
)

const light = (isLight, color) => css`
  fill: ${isLight ? color : '#939393'};
`

const useAstronomy = (state, initial) => {
  const [astronomy, setAstronomy] = useState(
    initial === 'light' ? 'sun' : 'moon'
  )
  const flick = (astro) => {
    setTimeout(() => setAstronomy(astro), SPEED / 2)
  }
  useEffect(() => {
    if (state === 'toLight') flick('sun')
    if (state === 'toDark') flick('moon')
  }, [state])

  return [astronomy === 'sun', astronomy === 'moon']
}

export default function ThemeToggle() {
  const initialTheme = typeof window !== 'undefined' ? window.__theme : 'light'
  const { theme } = useTheme()

  const [state, send] = useMachine(machine, initialTheme)
  const [sun, moon] = useAstronomy(state, initialTheme)

  const onToggle = useCallback(
    (checked) => {
      send(checked ? 'light' : 'dark')
    },
    [send]
  )

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        align-items: center;
      `}
    >
      <FaMoon css={light(moon, '#d1d14e')} />
      <div
        css={css`
          margin: 0 4px;
          display: inherit;
        `}
      >
        <Toggle
          transitionSpeed={SPEED}
          onToggle={onToggle}
          initialChecked={theme === 'light'}
        />
      </div>
      <FaSun css={light(sun, '#ffb500')} />
    </div>
  )
}
