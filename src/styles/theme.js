import { css } from '@emotion/core'

const primaryColor = '#fc4445'
const secondaryColor = '#fff'
const textColor = 'rgba(0, 0, 0, 0.5)'
const footerIconFontSize = '25px'

export default {
  primaryColor,
  secondaryColor,
  textColor,
  footerIconFontSize,
  smallScreen: `@media (max-width: 480px)`,
  orangeLink: css`
    color: ${textColor};
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: ${primaryColor};
    }
  `,
  infoItemStyle: css`
    color: ${textColor};
    font-size: 14px;
    margin-right: 10px;
    span {
      margin-left: 5px;
    }
  `,
}
