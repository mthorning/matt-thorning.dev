import React from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { css } from '@emotion/core'
import { secondaryColor } from '../constants'

export default function({ className }) {
  const logoStyling = css`
    color: ${secondaryColor};
    font-size: 30px;
    margin: 10px;
    &:hover {
      color: ${secondaryColor};
    }
  `
  return (
    <div css={className}>
      <a css={logoStyling} href="https://twitter.com/thorning_m">
        <FaTwitter />
      </a>
      <a css={logoStyling} href="https://github.com/mthorning">
        <FaGithub />
      </a>
    </div>
  )
}
