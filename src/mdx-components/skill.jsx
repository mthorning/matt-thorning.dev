import React from 'react'
import { css } from '@emotion/react'

const button = css`
  display: block;
  width: 115px;
  height: 25px;
  background: #4e9caf;
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  line-height: 25px;
  float: left;
  margin: 12px;
`

export default function () {
  return (
    <div>
      <h1>Javascript</h1>
      <p>My main language and the one I use professionally</p>
      <div>
        <a css={button} href="#">
          Javascript Blog Posts
        </a>
        <a css={button} href="#">
          Github
        </a>
      </div>
    </div>
  )
}
