import React, { useState } from 'react'
import { css } from '@emotion/react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { FaSun, FaMoon } from 'react-icons/fa'
import Toggle from '../Toggle'

const light = (isLight, color) => css`
  fill: ${isLight ? color : 'var(--color)'};
`

export default function ThemeToggle() {
  const initialChecked =
    typeof window === 'undefined' ? false : window.__theme === 'light'

  const [time, setTime] = useState(initialChecked ? 'day' : 'night')
  return (
    <div
      css={css`
        height: 100%;
        display: flex;
        align-items: center;
      `}
    >
      <FaMoon css={light(time === 'night', '#d1d14e')} />
      <div css={{ margin: '0 4px' }}>
        <ThemeToggler>
          {({ toggleTheme }) => {
            return (
              <Toggle
                onToggle={(checked) => {
                  toggleTheme(checked ? 'light' : 'dark')
                  setTime(checked ? 'day' : 'night')
                }}
                initialChecked={initialChecked}
              />
            )
          }}
        </ThemeToggler>
      </div>
      <FaSun css={light(time === 'day', '#ffb500')} />
    </div>
  )
}
