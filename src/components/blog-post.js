import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from './layout'

export default function Template({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <div className="blog-post-container">
        <Helmet title={`HelloCode - ${post.frontmatter.title}`} />
        <div className="blog-post">
          <h1>{post.frontmatter.title}</h1>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
