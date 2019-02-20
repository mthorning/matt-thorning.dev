import React from 'react'
import { FaCalendarAlt, FaTag, FaStopwatch } from 'react-icons/fa'
import { textColor, smallScreen } from '../constants'
import { css } from 'emotion'

export default function BlogInfo({ className, post, children }) {
  const infoWrapper = css`
    display: flex;
    ${smallScreen} {
      flex-direction: column;
    }
  `
  const infoItem = css`
    color: ${textColor};
    font-size: 14px;
    margin-right: 10px;
    span {
      margin-left: 5px;
    }
  `

  const CalendarDate = () => (
    <div className={infoItem}>
      <FaCalendarAlt />
      <span>{post.frontmatter.date}</span>
    </div>
  )

  const Tag = () => (
    <div className={infoItem}>
      <FaTag />
      <span>{post.frontmatter.tag}</span>
    </div>
  )

  const TimeToRead = () => (
    <div className={infoItem}>
      <FaStopwatch />
      <span>{post.timeToRead} minute read</span>
    </div>
  )

  return (
    <div
      className={css`
        ${className}
        h1 {
          margin-bottom: 10px;
        }
      `}
    >
      {children}
      <div className={infoWrapper}>
        <CalendarDate />
        <Tag />
        <TimeToRead />
      </div>
    </div>
  )
}
