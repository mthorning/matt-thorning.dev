import React from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { headingTextColor } from '../constants'
import { css } from 'emotion'

export default function CalendarDate({ className, date }) {
  const wrapper = css`
    ${className}
    color: ${headingTextColor};
    font-size: 14px;
    display: flex;
    align-items: center;

    span {
      margin-left: 5px;
    }
  `
  return (
    <div className={wrapper}>
      <FaRegCalendarAlt />
      <span>{date}</span>
    </div>
  )
}
