import { css } from '@emotion/core'

export const tagDisplay = theme => css`
  color: ${theme.textColor};
  font-size: ${theme.blogInfoIconFontSize};
  span {
    margin-left: 5px;
  }
`
export const baseStyle = theme => css`
  border-radius: 4px;
  background: var(--tagBg);
  color: ${theme.textColor};
  padding: 4px;
  margin: 5px 5px 0 0;
  cursor: pointer;
  display: flex;
  align-items: end;
`
export const wrapper = css`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`
export const tagNumber = theme => css`
  margin-left: 5px;
  font-size: 14px;
  color: var(--tagColor);
`
