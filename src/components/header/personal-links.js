import React from 'react'
import { IoMdInformationCircleOutline } from 'react-icons/io'
import { personalLinks } from './style'

export default function PersonalLinks() {
  return (
    <div css={personalLinks}>
      <a href="https://matt-thorning.dev">
        <IoMdInformationCircleOutline />
      </a>
    </div>
  )
}
