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
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 32px;
  svg {
    font-size: 40px;
    fill: gray;
  }
`
