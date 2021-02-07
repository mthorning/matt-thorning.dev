import { css } from '@emotion/react'

export default css`
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  * {
    scrollbar-width: thin;
    scrollbar-color: gray, gray;
  }
  *:hover {
    scrollbar-color: gray, gray;
  }
  *::-webkit-scrollbar-track {
    background: var(--white);
    border: none;
  }
  *::-webkit-scrollbar-corner {
    background: gray;
  }
  *::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 3px;
    border: none;
  }
`
