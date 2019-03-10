import { css } from '@emotion/core'

const sharedStyles = css`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  font-size: 15px;
`
export const wrapper = theme => css`
  display: flex;
  align-items: center;
  align-self: center;
  padding: 4px;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.5);
  cursor: pointer;
  ${sharedStyles}

  div {
    ${sharedStyles}
    position: absolute;
    top: 32px;
    right: -1px;
    width: 280px;
    background: #fff;
    box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
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
      color: ${theme.primaryColor};
      background: rgba(200, 200, 200, 0.1);
    }
  }
`
export const selectedStyle = css`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  div {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
`
export const overlay = css`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`
