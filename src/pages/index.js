import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'layouts/main-layout'
import { BlogPostPreview } from 'components/blog'
import { SEO } from 'components'
import { TagSelector } from 'components/tags'

export default function Page({ location: { search }, data }) {
  const { edges: posts } = data.allMdx
  const { siteMetadata } = data.site
  return (
    <Layout animateHeader>
      <SEO
        title="Home"
        description={siteMetadata.description}
        author={siteMetadata.author}
        keywords={Array.from(
          new Set(
            posts.reduce(
              (keywords, post) => [...keywords, ...post.node.frontmatter.tags],
              []
            )
          )
        )}
      />
      <TagSelector {...{ posts, search }}>
        {posts =>
          posts.map(({ node: post }) => (
            <BlogPostPreview key={post.id} post={post} />
          ))
        }
      </TagSelector>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        description
        title
        author
      }
    }
    allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          timeToRead
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            tags
          }
        }
      }
    }
  }
`
