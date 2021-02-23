import React, { useState } from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from 'layouts/main-layout'
import { ShareButtons, PreviousNext } from 'components'
import { BlogInfo, JumpToSection } from 'components/blog'
import { blogFunctionsWrapper, blogFunctions } from './styles'
import Clap from 'components/clap'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Prism, { PrismOptionsProvider } from 'components/prism'

function BlogFunctions({ post }) {
  return (
    <div css={blogFunctionsWrapper}>
      <h1>{post.frontmatter.title}</h1>
      <div css={blogFunctions}>
        <BlogInfo post={post} />
        <JumpToSection headings={post.headings} slug={post.frontmatter.slug} />
      </div>
    </div>
  )
}

const components = {
  pre: (props) => <Prism {...props} />,
}

export default function BlogPost({ data, location, pageContext }) {
  const [containerHeight, setContainerHeight] = useState(0)
  console.log(containerHeight)

  const post = data.mdx
  const { siteMetadata } = data.site
  const { previous, next } = pageContext

  return (
    <PrismOptionsProvider>
      <Layout>
        <Helmet>
          <title>{post.frontmatter.title}</title>
          <meta name="description" content={post.frontmatter.description} />
          <meta name="keywords" content={post.frontmatter.tags.join(',')} />
          <meta name="author" content={siteMetadata.author} />
        </Helmet>
        <BlogFunctions post={post} />
        <div
          ref={(el) => {
            if (el) setContainerHeight(el.scrollHeight)
          }}
        >
          <MDXProvider {...{ components }}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </div>

        <Clap slug={post.frontmatter.slug} />
        <ShareButtons shareUrl={location.href} title={post.frontmatter.title} />
        <PreviousNext
          slug={post.frontmatter.slug}
          previous={previous}
          next={next}
        />
      </Layout>
    </PrismOptionsProvider>
  )
}

export const pageQuery = graphql`
  query BlogPostQuery($id: String!) {
    mdx(id: { eq: $id }) {
      headings(depth: h2) {
        value
        depth
      }
      body
      id
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        tags
      }
    }
    site {
      siteMetadata {
        author
      }
    }
  }
`
