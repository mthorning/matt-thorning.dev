import { css } from '@emotion/react'

export const tagDisplay = (theme) => css`
  color: ${theme.textColor};
  font-size: ${theme.blogInfoIconFontSize};
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`
export const tagStyle = (theme) => css`
  border-radius: 4px;
  background: var(--tagBg);
  color: ${theme.textColor};
  padding: 4px;
  margin-bottom: 4px;
  margin-right: 4px;
  display: flex;
  align-items: end;
  user-select: none;
`
export const wrapper = css`
  display: flex;
  flex-wrap: wrap;
`
export const tagNumber = css`
  top: 4px;
  right: 8px;
  margin-left: 5px;
  font-size: 14px;
  color: var(--tagColor);
`
export const clearButton = (hide) => css`
  font-style: italic;

  ${hide && 'display: none;'}
`
