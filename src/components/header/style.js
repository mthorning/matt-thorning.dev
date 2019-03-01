import { css } from '@emotion/core'

export const wrapper = theme => css`
  background: ${theme.primaryColor};
  margin-bottom: 1.45rem;
  height: 86px;
  position: relative;
`
export const titleWrapper = css`
  margin: 0 auto;
  max-width: 1200px;
  padding: 20px;
`
export const personalLinks = theme => css`
  position: absolute;
  top: 0;
  right: 20px;
  font-size: 25px;

  ${theme.smallScreen} {
    right: 0;
  }
  a {
    color: ${theme.secondaryColor};
    font-size: 30px;
    margin: 10px;
  }
`
export const title = theme => css`
  margin: 0;
  display: inline-block;
  color: ${theme.secondaryColor};
  ${theme.smallScreen} {
    font-size: 35px;
  }
`
