import React from 'react'
import { FiCalendar, FiClock } from 'react-icons/fi'
import { TagDisplay } from 'components/tags'
import ClapIcon from 'components/clap/ClapIcon'
import { infoWrapper, infoItemStyle, infoWrapperTopRow } from './styles'

export default function BlogInfo({ post }) {
  const { claps } = post
  const CalendarDate = () => (
    <div css={infoItemStyle}>
      <FiCalendar />
      <span>{post.date}</span>
    </div>
  )

  const TimeToRead = () => (
    <div css={infoItemStyle}>
      <FiClock />
      <span>{post.timeToRead} minute read</span>
    </div>
  )

  const Claps = () => (
    <div css={infoItemStyle}>
      {claps > 0 ? (
        <>
          <ClapIcon fill="var(--color)" styles={{ marginLeft: '-5px' }} />
          <span>{`${claps} clap${claps === 1 ? '' : 's'}`}</span>
        </>
      ) : null}
    </div>
  )

  return (
    <div css={infoWrapper}>
      <div css={infoWrapperTopRow}>
        <CalendarDate />
        <TimeToRead />
        <Claps />
      </div>
      <TagDisplay tags={post.tags} />
    </div>
  )
}
