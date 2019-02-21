import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { textColor, primaryColor } from '../constants'

export default function TagSelector({ tags, selectedTags, setSelectedTags }) {
  const baseStyle = css`
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.1);
    color: ${textColor};
    padding: 4px;
    margin-right: 5px;
    cursor: pointer;
  `
  function onTagClick(e) {
    const tag = e.target.innerText
    setSelectedTags({
      ...selectedTags,
      [tag]: !selectedTags[tag],
    })
  }

  function TagBlock(tag) {
    const tagCol =
      selectedTags[tag] &&
      css`
        color: ${primaryColor};
      `
    return (
      <span key={tag} onClick={onTagClick} css={[baseStyle, tagCol]}>
        {tag}
      </span>
    )
  }
  return <>{tags.map(TagBlock)}</>
}
