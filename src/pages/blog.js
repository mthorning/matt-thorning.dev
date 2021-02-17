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
    <Layout>
      <SEO
        title="Blog Posts"
        description="Posts about web development, coding, computing and other things that haven't been decided yet."
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
        {(posts) =>
          posts.map(({ node: post }) => (
            <BlogPostPreview key={post.id} post={post} />
          ))
        }
      </TagSelector>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        author
      }
    }
    allMdx(
      filter: { frontmatter: { type: { eq: "blog" }, published: { eq: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
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
