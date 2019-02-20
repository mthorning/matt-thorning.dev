import { css } from 'emotion'

export const headingTextColor = 'rgba(0, 0, 0, 0.5)'
export const highlightColor = '#fc4445'
export const smallScreen = `@media (max-width: 480px)`

export const orangeLink = css`
  color: ${headingTextColor};
  &:hover {
    color: #fc4445;
  }
`
