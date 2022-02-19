import { css } from '@emotion/react'
import { menu as allMenu, nav as allNav } from '../styles'

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
export const menu = css`
  ${allMenu}
  position: relative;
`
export const close = open => css`
  visibility: ${open ? 'visible' : 'hidden'};
  svg {
    font-size: 40px;
    fill: gray;
  }
`
export const bottomRow = css`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 32px;
  height: 108px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
