import React from 'react'
import { FaTag } from 'react-icons/fa'

export default function Tag({ className, tag }) {
  return (
    <div className={className}>
      <FaTag />
      <span>{tag}</span>
    </div>
  )
}
