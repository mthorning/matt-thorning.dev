import { css } from '@emotion/react'

export const infoWrapper = css`
  user-select: none;
  margin: 0.5rem 0 0.5rem;
  display: inline-block;
`
export const blogFunctionsWrapper = css`
  margin-bottom: 1.5rem;

  h1 {
    margin: 0;
  }
`
export const infoItemStyle = (theme) => css`
  display: flex;
  align-items: center;
  color: ${theme.textColor};
  font-size: ${theme.blogInfoIconFontSize};
  margin-right: 0.5rem;
  span {
    margin-left: 0.25rem;
  }
`
export const infoWrapperTopRow = (theme) => css`
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
