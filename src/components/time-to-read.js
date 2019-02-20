import React from 'react'
import { FaStopwatch } from 'react-icons/fa'

export default function Tag({ className, timeToRead }) {
  return (
    <div className={className}>
      <FaStopwatch />
      <span>{timeToRead} minute read</span>
    </div>
  )
}
