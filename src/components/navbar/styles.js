import { css } from '@emotion/react'

export const nav = css`
  background: var(--bg);
  box-shadow: 0 0 2px gray;
`
export const inner = css`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`
export const menu = css`
  margin: 0;
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
    margin-bottom: 1rem;
    font-size: 1.5rem;
    user-select: none;
    width: 100%;
    height: 100%;
    color: var(--color);
  }
`
export const themeToggle = css`
  padding: 32px;
  display: flex;
  justify-content: center;
`
