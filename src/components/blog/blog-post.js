import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from 'layouts/main-layout'
import { ShareButtons, PreviousNext } from 'components'
import { BlogInfo, JumpToSection } from 'components/blog'
import { blogFunctionsWrapper, blogFunctions } from './styles'

export default function Template({ data, location, pageContext }) {
  const post = data.markdownRemark
  const { siteMetadata } = data.site
  const { previous, next } = pageContext

  function BlogFunctions() {
    return (
      <div css={blogFunctionsWrapper}>
        <h1>{post.frontmatter.title}</h1>
        <div css={blogFunctions}>
          <BlogInfo post={post} />
          <JumpToSection
            headings={post.headings}
            path={post.frontmatter.path}
          />
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.frontmatter.description} />
        <meta name="keywords" content={post.frontmatter.tags.join(',')} />
        <meta name="author" content={siteMetadata.author} />
      </Helmet>
      <BlogFunctions />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <ShareButtons shareUrl={location.href} title={post.frontmatter.title} />
      <PreviousNext previous={previous} next={next} />
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      headings(depth: h2) {
        value
        depth
      }
      html
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        description
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`
