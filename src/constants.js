import { css } from 'emotion'

export const primaryColor = '#fc4445'
export const secondaryColor = '#fff'
export const textColor = 'rgba(0, 0, 0, 0.5)'
export const smallScreen = `@media (max-width: 480px)`

export const orangeLink = css`
  color: ${textColor};
  &:hover {
    color: ${primaryColor};
  }
`
