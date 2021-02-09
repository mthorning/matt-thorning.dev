import React from 'react'
import { css } from '@emotion/react'
import { graphql } from 'gatsby'
import Layout from 'layouts/main-layout'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const components = {
  table: (props) => (
    <div
      css={css`
        overflow-x: auto;
        margin-bottom: 32px;
      `}
    >
      <table {...props} />
    </div>
  ),
}

export default function Template({ data }) {
  const post = data.mdx

  return (
    <Layout>
      <MDXProvider {...{ components }}>
        <MDXRenderer>{post.body}</MDXRenderer>
      </MDXProvider>
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
