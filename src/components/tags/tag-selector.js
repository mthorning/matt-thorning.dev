import React from 'react'
import { clearButton, baseStyle, wrapper, tagNumber } from './style'
import { a11yButton } from 'utils'
import { css } from '@emotion/core'
import useSearchParams from './useSearchParams'

export default function({ search, posts, children }) {
  const {
    postHasSelectedTag,
    selectedTags,
    addTag,
    removeTag,
  } = useSearchParams(search)

  const tags = posts.reduce((tags, post) => {
    if (postHasSelectedTag(post)) {
      return (tags = [...tags, ...post.node.frontmatter.tags])
    }
    return tags
  }, [])

  const filteredPosts = posts.filter(
    post => postHasSelectedTag(post) && post.node.frontmatter.title.length > 0
  )

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
      addTag(tag)
    } else if (selectedTags.length && selectedTags.includes(tag)) {
      removeTag(tag)
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
        {...a11yButton(() => onTagClick(tag))}
        css={theme => [baseStyle, tagCol].map(a => a(theme))}
      >
        {tag}
        {!isSelected && <span css={tagNumber}>{tagCount[tag]}</span>}
      </span>
    )
  }
  return (
    <>
      <div css={wrapper}>
        {selectedTags.map(TagBlock)}
        {tagList
          .filter(tag => !selectedTags.includes(tag))
          .sort()
          .map(TagBlock)}
      </div>
      <span
        {...a11yButton(() => removeTag())}
        css={clearButton(!selectedTags.length)}
      >
        clear
      </span>
      {children(filteredPosts)}
    </>
  )
}
