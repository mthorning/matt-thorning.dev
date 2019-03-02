import { css } from '@emotion/core'

export const wrapper = theme => css`
  display: flex;
  justify-content: flex-end;

  ${theme.smallScreen} {
    justify-content: center;
  }
`
export const iconWrapper = (theme, color) => css`
  color: ${theme.textColor};
  font-size: ${theme.footerIconFontSize};
  width: 40px;
  height: 40px;
  display: flex;
  padding: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 40px;

  div {
    cursor: pointer;
    transition: 0.3s ease;
  }
  &:hover div {
    font-size: 45px;
    color: ${color};
  }
`
