import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { FaSun, FaMoon } from 'react-icons/fa'
import { createMachine, useMachine } from 'utils/robot'
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

export default function ThemeToggle() {
  const initialTheme = typeof window !== 'undefined' ? window.__theme : 'light'
  const [state, send, context] = useMachine(machine, initialTheme)

  const [theme, setTheme] = useState(initialTheme)
  useEffect(() => (window.__onThemeChange = () => setTheme(window.__theme)), [])

  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        align-items: center;
      `}
    >
      <FaMoon css={light(theme === 'dark', '#d1d14e')} />
      <div
        css={css`
          margin: 0 4px;
          display: inherit;
        `}
      >
        <Toggle
          transitionSpeed={SPEED}
          onToggle={(checked) => {
            send(checked ? 'light' : 'dark')
          }}
          initialChecked={theme === 'light'}
        />
      </div>
      <FaSun css={light(theme === 'light', '#ffb500')} />
    </div>
  )
}
