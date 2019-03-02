import { css } from '@emotion/core'

export const infoWrapper = css`
  margin-bottom: 10px;
  h1 {
    margin-bottom: 15px;
  }
`
export const infoItemStyle = theme => css`
  color: ${theme.textColor};
  font-size: ${theme.blogInfoIconFontSize};
  margin-right: 10px;
  span {
    margin-left: 5px;
  }
`
export const infoWrapperTopRow = theme => css`
  display: flex;
  ${theme.smallScreen} {
    flex-direction: column;
  }
`
