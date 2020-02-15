import { css } from '@emotion/core'

const sharedStyles = css`
  border: 1px solid var(--color);
  border-radius: 2px;
  font-size: 15px;
`
export const wrapper = theme => css`
  display: flex;
  align-items: center;
  align-self: center;
  padding: 4px;
  position: relative;
  border: 2px solid var(--color);
  cursor: pointer;
  ${sharedStyles}

  div {
    ${sharedStyles}
    position: absolute;
    width: 280px;
    background: var(--bg);
    box-shadow: 1px 1px 2px var(--color);
    z-index: 1;

    ul {
      margin: 0;
      list-style-type: none;
    }
    li {
      margin: 4px 0;
      padding: 0 4px;
    }
    li:hover {
      color: var(--linkHover);
      background: var(--tagBg);
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
export const bySide = side => css`
  top: 32px;
  ${side}: -1px;
  border-top-${side}-radius: 0 !important;
`
