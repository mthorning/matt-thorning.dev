import { css } from 'emotion'

export const primaryColor = '#fc4445'
export const secondaryColor = '#fff'
export const textColor = 'rgba(0, 0, 0, 0.5)'
export const smallScreen = `@media (max-width: 480px)`
export const footerIconFontSize = '25px'

export const orangeLink = css`
  color: ${textColor};
  cursor: pointer;
  &:hover {
    color: ${primaryColor};
  }
`
export const infoItemStyle = css`
  color: ${textColor};
  font-size: 14px;
  margin-right: 10px;
  span {
    margin-left: 5px;
  }
`
