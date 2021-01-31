import { css } from '@emotion/react'

export const title = (theme) => css`
  margin: 0;
  display: inline-block;
  color: var(--linkHover);
`
export const whiteBorder = (theme) => css`
  border-right: 3px solid var(--linkHover);
`
export const blinkBorder = (theme) => css`
  @keyframes blink {
    50% {
      border-right: 3px solid var(--bg);
    }
  }
  animation: blink 0.5s step-end infinite alternate;
`
