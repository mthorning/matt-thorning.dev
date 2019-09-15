import React from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { personalLinks } from './style'

export default function PersonalLinks() {
  return (
    <div css={personalLinks}>
      <a href="https://twitter.com/MattThorning">
        <FaTwitter />
      </a>
      <a href="https://github.com/mthorning">
        <FaGithub />
      </a>
    </div>
  )
}
