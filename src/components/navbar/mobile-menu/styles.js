import { css } from '@emotion/react'
import { themeToggle, nav as allNav } from '../styles'

export const nav = css`
  ${allNav}
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  left: calc(0px - 100vw);
  transition: all 1s;
  &.open {
    left: 0;
  }
`
export const close = css`
  cursor: pointer;
  svg {
    font-size: 40px;
    fill: gray;
  }
`
export const bottomRow = css`
  ${themeToggle}
  padding: 32px;
  height: 108px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
`
