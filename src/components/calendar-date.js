import React from 'react'
import { FaCalendarAlt } from 'react-icons/fa'

export default function CalendarDate({ className, date }) {
  return (
    <div className={className}>
      <FaCalendarAlt />
      <span>{date}</span>
    </div>
  )
}
