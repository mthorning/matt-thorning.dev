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
`
const wrapper = css`
  display: flex;
  flex-wrap: wrap;
`
export default function TagSelector({ tags, selectedTags, dispatch }) {
  function onTagClick(e) {
    const payload = e.target.innerText
    if (!selectedTags.includes(payload)) {
      dispatch({ type: 'add', payload })
    } else if (selectedTags.length && selectedTags.includes(payload)) {
      dispatch({ type: 'remove', payload })
    }
  }

  function TagBlock(tag) {
    const tagCol =
      selectedTags.includes(tag) &&
      css`
        color: ${primaryColor};
      `
    return (
      <span
        key={tag}
        onClick={onTagClick}
        css={css`
          ${baseStyle}
          ${tagCol}
        `}
      >
        {tag}
      </span>
    )
  }
  return <div css={wrapper}>{tags.sort().map(TagBlock)}</div>
}
