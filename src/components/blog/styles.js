import { css } from '@emotion/core'

export const infoWrapper = css`
  margin: 10px 0 10px;
  display: inline-block;
`
export const blogFunctionsWrapper = css`
  margin-bottom: 30px;
  margin-top: 50px;

  h1 {
    margin: 0;
  }
`
export const infoItemStyle = theme => css`
  display: flex;
  align-items: center;
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
export const blogFunctions = css`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
