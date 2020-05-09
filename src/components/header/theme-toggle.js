import React from 'react'
import { themeToggle } from './style'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import Toggle from '../Toggle'

export default function ThemeToggle() {
  return (
    <div css={themeToggle}>
      <ThemeToggler>
        {({ toggleTheme }) => (
          <Toggle
            onToggle={checked => {
              toggleTheme(checked ? 'dark' : 'light')
            }}
            initialChecked={
              typeof window === 'undefined' ? false : window.__theme === 'dark'
            }
          />
        )}
      </ThemeToggler>
    </div>
  )
}
