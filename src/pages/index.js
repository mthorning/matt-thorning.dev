import React, { useReducer } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import BlogPostPreview from '../components/blog-post-preview'
import TagSelector from '../components/tag-selector'

export default function({ data }) {
  const { edges: posts } = data.allMarkdownRemark

  const tags = Array.from(
    new Set(
      posts.reduce(
        (tags, post) => (tags = [...tags, ...post.node.frontmatter.tags]),
        []
      )
    )
  )

  function reducer(state, action) {
    switch (action.type) {
      case 'add':
        return {
          selectedTags: [...state.selectedTags, action.payload],
        }
      case 'remove':
        const index = state.selectedTags.indexOf(action.payload)
        return {
          selectedTags: [
            ...state.selectedTags.slice(0, index),
            ...state.selectedTags.slice(index + 1),
          ],
        }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, { selectedTags: [] })
  const { selectedTags } = state

  function filterBySelectedTags(post) {
    const { tags } = post.node.frontmatter
    const { selectedTags } = state
    if (!selectedTags.length) return true
    if (selectedTags.filter(selected => !tags.includes(selected)).length)
      return false

    return true
  }

  return (
    <Layout>
      <SEO
        title="Hello Code"
        keywords={[
          `JavaScript`,
          `web`,
          `development`,
          `frontend`,
          `linux`,
          `networking`,
          `programming`,
        ]}
      />
      <TagSelector {...{ tags, selectedTags, dispatch }} />
      <div className="blog-posts">
        {posts
          .filter(filterBySelectedTags)
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => (
            <BlogPostPreview key={post.id} post={post} />
          ))}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          timeToRead
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
          }
        }
      }
    }
  }
`
