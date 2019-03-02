import React from 'react'
import { FaCalendarAlt, FaStopwatch } from 'react-icons/fa'
import { TagDisplay } from 'components/tags'
import { infoWrapper, infoItemStyle, infoWrapperTopRow } from './style'

export default function BlogInfo({ post, children }) {
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
    <div css={infoWrapper}>
      {children}
      <div css={infoWrapperTopRow}>
        <CalendarDate />
        <TimeToRead />
      </div>
      <TagDisplay tags={post.frontmatter.tags} />
    </div>
  )
}
