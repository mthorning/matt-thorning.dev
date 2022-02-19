import { css } from '@emotion/react'

const sharedStyles = css`
  border: 1px solid var(--color);
  border-radius: 2px;
  font-size: 17px;
`
export const wrapper = css`
  padding: 4px;
  display: flex;
  align-self: center;
  justify-content: space-between;
  position: relative;
  border: 2px solid var(--color);
  ${sharedStyles}

  span {
    display: inline-flex;
    align-items: center;
  }

  div {
    ${sharedStyles}
    position: absolute;
    width: 280px;
    background: var(--bg);
    box-shadow: 1px 1px 2px var(--color);
    z-index: 1;

    ul {
      margin: 0;
      padding: 0.5em;
      list-style-type: none;
    }
    li {
      margin: 0.4em 0;
    }
    li a {
      display: block;
      padding: 0.6em 0;
      height: 100%;
      color: var(--color);
    }
    li a:hover {
      color: var(--linkHover);
    }
  }
`

export const selectedStyle = css`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`

export const overlay = css`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`
export const bySide = (side) => css`
  top: 32px;
  ${side}: -1px;
  border-top-${side}-radius: 0 !important;
`
