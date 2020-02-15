import React, { useEffect, useState } from 'react'
import { css } from '@emotion/core'
import { themeToggle } from './style'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'

const switchStyle = checked => css`
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    transition: all 0.3s;
    cursor: pointer;
  }
  &::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--secondaryColor);
    top: 1px;
    left: ${checked ? '20px' : '1px'};
    transition: all 0.3s;
  }
`

function Toggle({ theme, toggleTheme }) {
  const [checked, setChecked] = useState(
    typeof window === 'undefined' ? false : window.__theme === 'dark'
  )

  const clickHandler = () => {
    setChecked(!checked)
  }
  useEffect(() => {
    toggleTheme(checked ? 'dark' : 'light')
  }, [checked])

  return <div onClick={clickHandler} css={switchStyle(checked)}></div>
}
export default function ThemeToggle() {
  return (
    <div css={themeToggle}>
      <ThemeToggler>{props => <Toggle {...props} />}</ThemeToggler>
    </div>
  )
}
