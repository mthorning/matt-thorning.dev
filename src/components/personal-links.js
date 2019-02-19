import React from 'react'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { orangeLink } from '../constants'

export default function() {
  return (
    <div>
      <a className={orangeLink} href="https://twitter.com/thorning_m">
        <FaTwitter />
      </a>
      <a className={orangeLink} href="https://github.com/mthorning">
        <FaGithub />
      </a>
    </div>
  )
}
