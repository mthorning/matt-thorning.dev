import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from 'layouts/main-layout'
import { ShareButtons, PreviousNext } from 'components'
import { BlogInfo } from 'components/blog'
import { css } from '@emotion/core'

export default function Template({ data, location, pageContext }) {
  const post = data.markdownRemark
  const { previous, next } = pageContext

  function Title() {
    const wrapper = css`
      margin-bottom: 30px;
    `

    return (
      <div css={wrapper}>
        <BlogInfo post={post}>
          <h1>{post.frontmatter.title}</h1>
        </BlogInfo>
      </div>
    )
  }

  return (
    <Layout>
      <Helmet title={`HC | ${post.frontmatter.title}`} />
      <Title />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <ShareButtons shareUrl={location.href} title={post.frontmatter.title} />
      <PreviousNext previous={previous} next={next} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
      }
    }
  }
`
