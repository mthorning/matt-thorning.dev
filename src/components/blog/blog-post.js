import React from 'react'
import { graphql } from 'gatsby'
import Highlight, { defaultProps } from 'prism-react-renderer'
import nightOwl from 'prism-react-renderer/themes/nightOwl'
import Helmet from 'react-helmet'
import Layout from 'layouts/main-layout'
import { ShareButtons, PreviousNext } from 'components'
import { BlogInfo, JumpToSection } from 'components/blog'
import { blogFunctionsWrapper, blogFunctions } from './styles'
import Clap from 'components/clap'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

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

export default function Template({ data, location, pageContext }) {
  const post = data.mdx
  const { siteMetadata } = data.site
  const { previous, next } = pageContext

  console.log(defaultProps)
  const components = {
    // Prism code block component
    pre: props => {
      const className = props.children.props.className || ''
      const matches = className.match(/language-(?<lang>.*)/)
      return (
        <Highlight
          {...defaultProps}
          theme={nightOwl}
          code={props.children.props.children.trim()}
          language={
            matches && matches.groups && matches.groups.lang
              ? matches.groups.lang
              : ''
          }
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      )
    },
  }

  return (
    <Layout>
      <Helmet>
        <title>{post.frontmatter.title}</title>
        <meta name="description" content={post.frontmatter.description} />
        <meta name="keywords" content={post.frontmatter.tags.join(',')} />
        <meta name="author" content={siteMetadata.author} />
      </Helmet>
      <MDXProvider {...{ components }}>
        <BlogFunctions post={post} />
        <MDXRenderer>{post.body}</MDXRenderer>
        <Clap slug={post.frontmatter.slug} />
        <ShareButtons shareUrl={location.href} title={post.frontmatter.title} />
        <PreviousNext previous={previous} next={next} />
      </MDXProvider>
    </Layout>
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
