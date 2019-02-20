import React from 'react'
import CalendarDate from './calendar-date'
import Tag from './tag'
import TimeToRead from './time-to-read'
import { headingTextColor } from '../constants'
import { css } from 'emotion'

export default function BlogInfo({ className, post }) {
  const wrapper = css`
    ${className}
  `

  const info = css`
    color: ${headingTextColor};
    font-size: 14px;
    display: inline;
    margin-right: 10px;

    span {
      margin-left: 5px;
    }
  `
  return (
    <div className={wrapper}>
      <CalendarDate className={info} date={post.frontmatter.date} />
      <Tag className={info} tag={post.frontmatter.tag} />
      <TimeToRead className={info} timeToRead={post.timeToRead} />
    </div>
  )
}
