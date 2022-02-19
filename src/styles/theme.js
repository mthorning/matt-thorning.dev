import { css } from '@emotion/react'
const footerIconFontSize = '25px'
const blogInfoIconFontSize = '13px'
const maxWidth = '900px'

const theme = {
  highlightColor: '#218bf8',
  footerIconFontSize,
  blogInfoIconFontSize,
  contentMaxWidth: maxWidth,
  smallScreen: `@media (max-width: 480px)`,
  orangeLink: css`
    color: var(--color);
    text-decoration: none;
    &:hover {
      color: var(--linkHover);
      text-decoration: none;
    }
  `,
}
export default theme
