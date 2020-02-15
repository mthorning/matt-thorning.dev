import { css } from '@emotion/core'

const primaryColor = 'var(--primaryColor)'
const textColor = 'var(--color)'
const secondaryColor = 'var(--secondaryColor)'
const bg = 'var(--bg)'
const footerIconFontSize = '25px'
const blogInfoIconFontSize = '13px'
const maxWidth = '900px'

export default {
  primaryColor,
  secondaryColor,
  textColor,
  bg,
  footerIconFontSize,
  blogInfoIconFontSize,
  contentMaxWidth: maxWidth,
  headerMaxWidth: maxWidth,
  smallScreen: `@media (max-width: 480px)`,
  orangeLink: css`
    color: ${textColor};
    text-decoration: none;
    cursor: pointer;
    &:hover {
      color: var(--linkHover);
      text-decoration: none;
    }
  `,
}
