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
  box-shadow: 0 0 2px gray;
`
export const themeToggle = css`
  padding: 12px;
  height: 100%;
`
export const menu = css`
  margin: 0;
  padding: 0;
  display: flex;
  height: 48px;
  overflow-x: auto;
  li {
    list-style-type: none;
    margin: 2px 10px;
  }
  .active,
  li a:hover {
    border-bottom: 2px solid var(--linkHover);
  }
  a {
    display: flex;
    align-items: center;
    font-family: 'Catamaran';
    font-size: 20px;
    user-select: none;
    width: 100%;
    height: 100%;
    color: var(--color);
  }
`
