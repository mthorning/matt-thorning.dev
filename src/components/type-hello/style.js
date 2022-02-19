import { css } from '@emotion/react'

export const title = css`
  margin: 0;
  display: inline-block;
  color: var(--linkHover);
  border: none;
`
export const whiteBorder = css`
  border-right: 3px solid var(--linkHover);
`
export const blinkBorder = css`
  @keyframes blink {
    50% {
      border-right: 3px solid var(--bg);
    }
  }
  animation: blink 0.5s step-end infinite alternate;
`
