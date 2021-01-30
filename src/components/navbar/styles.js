import { css } from '@emotion/react'

export const nav = (theme) => css`
  position: sticky;
  z-index: 999;
  top: 0;
  right: 0;
  left: 0;
  padding: 12px;
  padding-bottom: 0;
  background: ${theme.bg};
  display: flex;
  align-items: center;
  justify-content: space-between;
`
export const themeToggle = css`
  padding: 12px;
  height: 100%;
`
export const menu = css`
  margin: 0;
  li {
    list-style-type: none;
    display: inline;
    margin: 2px 10px;
    float: left;
  }
  li a:hover {
    padding-bottom: 10px;
    border-bottom: 2px solid var(--linkHover);
  }
  a {
    user-select: none;
    width: 100%;
    height: 100%;
    padding: 12px 0;
    color: var(--color);
  }
`
