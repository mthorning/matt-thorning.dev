import React from 'react'
import { baseStyle, wrapper, tagNumber } from './style'
import { css } from '@emotion/core'

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
    const tagCol = theme =>
      isSelected &&
      css`
        color: var(--tagColor);
      `
    return (
      <span
        key={tag}
        onClick={() => onTagClick(tag)}
        css={theme => [baseStyle, tagCol].map(a => a(theme))}
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
