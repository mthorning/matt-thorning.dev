import React from 'react'
import { FaCalendarAlt, FaStopwatch } from 'react-icons/fa'
import { css } from '@emotion/core'

export default function BlogInfo({ post, children }) {
  const CalendarDate = () => (
    <div css={theme => theme.infoItemStyle}>
      <FaCalendarAlt />
      <span>{post.frontmatter.date}</span>
    </div>
  )

  const TimeToRead = () => (
    <div css={theme => theme.infoItemStyle}>
      <FaStopwatch />
      <span>{post.timeToRead} minute read</span>
    </div>
  )

  return (
    <div
      css={css`
        h1 {
          margin-bottom: 15px;
        }
      `}
    >
      {children}
      <div css={theme => theme.infoWrapperStyle}>
        <CalendarDate />
        <TimeToRead />
      </div>
    </div>
  )
}
