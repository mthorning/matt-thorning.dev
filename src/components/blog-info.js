import React from 'react'
import { FaCalendarAlt, FaTag } from 'react-icons/fa'
import { textColor } from '../constants'
import { css } from 'emotion'

export default function BlogInfo({ className, post }) {
  const info = css`
    color: ${textColor};
    font-size: 14px;
    display: inline;
    margin-right: 10px;

    span {
      margin-left: 5px;
    }
  `

  const CalendarDate = () => (
    <div className={info}>
      <FaCalendarAlt />
      <span>{post.frontmatter.date}</span>
    </div>
  )

  const Tag = () => (
    <div className={info}>
      <FaTag />
      <span>{post.frontmatter.tag}</span>
    </div>
  )

  const TimeToRead = () => (
    <div className={info}>
      <FaStopwatch />
      <span>{post.timeToRead} minute read</span>
    </div>
  )

  return (
    <div className={className}>
      <CalendarDate />
      <Tag />
      <TimeToRead />
    </div>
  )
}
