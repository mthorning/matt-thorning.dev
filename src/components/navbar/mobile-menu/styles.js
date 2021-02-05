import { css } from '@emotion/react'
import { nav as allNav } from '../styles'

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
const bottomRow = css`
  bottom: 0;
  left: 0;
  right: 0;
  padding: 32px;
  height: 108px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`
export const themeToggle = css`
  ${bottomRow}
  position: absolute;
`
export const closeButton = css`
  ${bottomRow}
  position: fixed;
  justify-content: flex-end;
`
