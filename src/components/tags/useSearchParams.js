import { useMemo } from 'react'
import { navigate } from 'gatsby'

function updateSearch(searchParams) {
  navigate(`?${searchParams.toString()}`, { replace: true })
}

export default function (search) {
  const searchParams = useMemo(() => new URLSearchParams(search), [search])
  const selectedTags = searchParams.getAll('tag')

  function addTag(tag) {
    searchParams.append('tag', tag)
    updateSearch(searchParams)
  }

  function removeTag(tag) {
    searchParams.delete('tag')
    if (tag) {
      selectedTags.forEach((selectedTag) => {
        if (selectedTag !== tag) searchParams.append('tag', selectedTag)
      })
    }
    updateSearch(searchParams)
  }

  function postHasSelectedTag(post) {
    const { tags } = post.node.frontmatter
    if (!selectedTags.length) return true
    if (selectedTags.filter((selected) => !tags.includes(selected)).length)
      return false

    return true
  }

  return { selectedTags, addTag, removeTag, postHasSelectedTag }
}
