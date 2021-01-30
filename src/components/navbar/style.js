import { css } from '@emotion/react'

export const wrapper = (theme) => css`
  background: ${theme.bg};
  height: 86px;
`
export const innerWrapper = css`
  margin: auto;
  position: relative;
  height: 100%;
`
export const titleWrapper = css`
  margin: 0 auto;
  height: 100%;
  padding: 12px;
`
export const themeToggle = css`
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  font-size: 25px;
`
