import { css } from '@emotion/react'

export const nav = (theme) => css`
  background: ${theme.bg};
  box-shadow: 0 0 2px gray;
  @media (max-width: 800px) {
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100vw;
    left: calc(100vw + 10px);
    transition: all 1s;
  }
  &.open {
    left: 0;
  }
`
export const menu = css`
  position: sticky;
  top: 0;
  margin: 0;
  padding: 32px;
  li {
    list-style-type: none;
    margin: 2px 10px;
  }
  .active,
  li a:hover {
    color: var(--linkHover);
  }
  a {
    display: flex;
    align-items: center;
    font-family: 'Catamaran';
    font-size: 25px;
    user-select: none;
    width: 100%;
    height: 100%;
    color: var(--color);
  }
`
export const themeToggle = css`
  position: fixed;
  bottom: 0;
  padding: 32px;
`
export const hamburger = css`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  display: flex;
  background: var(--bg);
  align-items: center;
  border-radius: 10px;
  padding: 12px;
  box-shadow: var(--boxShadow);
  border: 1px solid gray;
  transition: all 0.5s;
  opacity: 0.75;
  @media (min-width: 800px) {
    display: none;
  }
`
