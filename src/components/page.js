import React from 'react'
import { graphql } from 'gatsby'
import Layout from 'layouts/main-layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export default function Template({ data }) {
  const post = data.mdx

  return (
    <Layout>
      <div css={{ marginTop: '50px' }}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query PageQuery($id: String!) {
    mdx(id: { eq: $id }) {
      headings(depth: h2) {
        value
        depth
      }
      body
      id
      frontmatter {
        slug
        title
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`
