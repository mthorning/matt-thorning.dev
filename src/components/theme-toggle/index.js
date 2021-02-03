import React from 'react'
import { css } from '@emotion/react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { FaSun, FaMoon } from 'react-icons/fa'
import Toggle from '../Toggle'

const SPEED = 500

const light = (isLight, color) => css`
  fill: ${isLight ? color : '#939393'};
`

export default function ThemeToggle() {
  const initialChecked =
    typeof window === 'undefined' ? false : window.__theme === 'light'

  return (
    <ThemeToggler>
      {({ theme, toggleTheme }) => {
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
                  toggleTheme(checked ? 'light' : 'dark')
                }}
                initialChecked={initialChecked}
              />
            </div>
            <FaSun css={light(theme === 'light', '#ffb500')} />
          </div>
        )
      }}
    </ThemeToggler>
  )
}
