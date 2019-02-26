import React from 'react'
import { css } from '@emotion/core'
import { textColor, primaryColor } from '../constants'

const baseStyle = css`
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.1);
  color: ${textColor};
  padding: 4px;
  margin: 5px 5px 0 0;
  cursor: pointer;
  display: flex;
  align-items: end;
`
const wrapper = css`
  display: flex;
  flex-wrap: wrap;
`
const tagNumber = css`
  margin-left: 5px;
  font-size: 14px;
  color: ${primaryColor};
`
export default function TagSelector({ tags, selectedTags, dispatch }) {
  const tagList = Array.from(new Set(tags))
  const tagCount = tagList.reduce(
    (acc, currentTag) =>
      (acc = {
        ...acc,
        [currentTag]: tags.filter(tag => tag === currentTag).length,
      }),
    {}
  )

  function onTagClick(tag) {
    if (!selectedTags.includes(tag)) {
      dispatch({ type: 'add', payload: tag })
    } else if (selectedTags.length && selectedTags.includes(tag)) {
      dispatch({ type: 'remove', payload: tag })
    }
  }

  function TagBlock(tag) {
    const isSelected = selectedTags.includes(tag)
    const tagCol =
      isSelected &&
      css`
        color: ${primaryColor};
      `
    return (
      <span
        key={tag}
        onClick={() => onTagClick(tag)}
        css={css`
          ${baseStyle}
          ${tagCol}
        `}
      >
        {tag}
        {!isSelected && <span css={tagNumber}>{tagCount[tag]}</span>}
      </span>
    )
  }
  return (
    <div css={wrapper}>
      {selectedTags.map(TagBlock)}
      {tagList
        .filter(tag => !selectedTags.includes(tag))
        .sort()
        .map(TagBlock)}
    </div>
  )
}
