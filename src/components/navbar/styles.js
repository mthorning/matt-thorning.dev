import { css } from '@emotion/react'

export const nav = (theme) => css`
  background: ${theme.bg};
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 2px gray;
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
