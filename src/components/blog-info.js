import React from 'react'
import { FaCalendarAlt, FaStopwatch } from 'react-icons/fa'
import { smallScreen, infoItemStyle } from '../constants'
import { css } from '@emotion/core'

const infoWrapperStyle = css`
  display: flex;
  ${smallScreen} {
    flex-direction: column;
  }
`
export default function BlogInfo({ className, post, children }) {
  const CalendarDate = () => (
    <div css={infoItemStyle}>
      <FaCalendarAlt />
      <span>{post.frontmatter.date}</span>
    </div>
  )

  const TimeToRead = () => (
    <div css={infoItemStyle}>
      <FaStopwatch />
      <span>{post.timeToRead} minute read</span>
    </div>
  )

  return (
    <div
      css={css`
        h1 {
          margin-bottom: 10px;
        }
      `}
    >
      {children}
      <div css={infoWrapperStyle}>
        <CalendarDate />
        <TimeToRead />
      </div>
    </div>
  )
}
