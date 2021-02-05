import { css } from '@emotion/react'

export const nav = css`
  background: var(--bg);
  box-shadow: 0 0 2px gray;
  overflow: hidden;
  height: 100vh;
`
export const menu = css`
  position: sticky;
  top: 0;
  margin: 0;
  padding: 32px;
  padding: 32px;
  li {
    list-style-type: none;
  }
  .active,
  li a:hover {
    color: var(--linkHover);
  }
  a {
    display: flex;
    align-items: center;
    font-family: 'Century Gothic', sans-serif;
    margin-bottom: 24px;
    font-size: 25px;
    user-select: none;
    width: 100%;
    height: 100%;
    color: var(--color);
  }
`
export const themeToggle = css`
  display: flex;
  justify-content: center;
`
