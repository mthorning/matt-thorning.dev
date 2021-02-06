import { css } from '@emotion/react'

export const iconWrapper = (theme) => css`
  font-size: ${theme.footerIconFontSize};
  width: 100%;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid ${theme.textColor};
  display: grid;
  // grid-template-columns: 25px 1fr 25px 1fr 25px;
  // grid-template-areas: 'prev prev-title home next-title next';
  grid-template-columns: 25px 1fr 25px;
  grid-template-areas: 'prev prev-title next-title next';
  grid-column-gap: 8px;
  align-items: center;
`
export const icon = (theme) => css`
  ${theme.orangeLink}
  display: flex;
`
export const title = (theme) => css`
  ${'' /*  This is an important hack for text-overflow */}
  min-width: 0;
  div {
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    ${theme.smallScreen} {
      display: none;
    }
  }
`
