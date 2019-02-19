import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from './layout'
import ShareButtons from './share-buttons'
import CalendarDate from './calendar-date'
import { css } from 'emotion'

export default function Template({ data }) {
  const post = data.markdownRemark

  function Title() {
    const wrapper = css`
      margin-bottom: 30px;
    `
    const title = css`
      margin-bottom: 10px;
    `

    return (
      <div className={wrapper}>
        <h1 className={title}>{post.frontmatter.title}</h1>
        <CalendarDate date={post.frontmatter.date} />
      </div>
    )
  }

  return (
    <Layout>
      <Helmet title={`HelloCode - ${post.frontmatter.title}`} />
      <Title />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <ShareButtons shareUrl={window.location.href} />
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
