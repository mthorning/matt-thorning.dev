import React from 'react'
import { FiCalendar, FiClock } from 'react-icons/fi'
import { TagDisplay } from 'components/tags'
import ClapIcon from 'components/clap/ClapIcon'
import { infoWrapper, infoItemStyle, infoWrapperTopRow } from './styles'
import useClaps from 'utils/useClaps'

export default function BlogInfo({ post, children }) {
  const [claps] = useClaps(post.frontmatter.slug)
  const CalendarDate = () => (
    <div css={infoItemStyle}>
      <FiCalendar />
      <span>{post.frontmatter.date}</span>
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
      <ClapIcon />
      <span>{`${claps} clap${claps !== 1 ? 's' : ''}`}</span>
    </div>
  )

  return (
    <div css={infoWrapper}>
      <div css={infoWrapperTopRow}>
        <CalendarDate />
        <TimeToRead />
        <Claps />
      </div>
      <TagDisplay tags={post.frontmatter.tags} />
    </div>
  )
}
