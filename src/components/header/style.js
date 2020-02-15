import { css } from '@emotion/core'

export const wrapper = theme => css`
  background: ${theme.primaryColor};
  height: 86px;
`
export const innerWrapper = theme => css`
  max-width: ${theme.headerMaxWidth};
  margin: auto;
  position: relative;
  height: 100%;
`
export const titleWrapper = css`
  margin: 0 auto;
  max-width: 1200px;
  height: 100%;
`
export const personalLinks = theme => css`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 25px;

  a {
    color: var(--white);
    font-size: 30px;
    margin: 10px;
  }
`
export const themeToggle = theme => css`
  position: absolute;
  bottom: 0;
  right: 13px;
  font-size: 25px;
`
export const title = theme => css`
  margin: 0;
  display: inline-block;
  color: ${theme.secondaryColor};
  ${theme.smallScreen} {
    font-size: 35px;
  }
  position: absolute;
  bottom: 10px;
`
export const whiteBorder = theme => css`
  border-right: 3px solid ${theme.secondaryColor};
`
export const blinkBorder = theme => css`
  @keyframes blink {
    50% {
      border-right: 3px solid ${theme.primaryColor};
    }
  }
  animation: blink 0.5s step-end infinite alternate;
`
