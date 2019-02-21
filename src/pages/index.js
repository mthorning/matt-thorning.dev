import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'
import BlogPostPreview from '../components/blog-post-preview'
import TagSelector from '../components/tag-selector'

export default function({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  const tags = Array.from(
    posts.reduce((tags, post) => tags.add(post.node.frontmatter.tag), new Set())
  )
  const [selectedTags, setSelectedTags] = useState({})
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
      <TagSelector {...{ tags, selectedTags, setSelectedTags }} />
      <div className="blog-posts">
        {posts
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
            tag
          }
        }
      }
    }
  }
`
