import React, { useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import { css } from '@emotion/react'
import Layout from 'layouts/main-layout'
import { BlogPostPreview } from 'components/blog'
import { SEO } from 'components'
import { TagSelector } from 'components/tags'
import { useQuery, gql } from '@apollo/client'
import PulseLoader from 'react-spinners/PulseLoader'
import { useIntersectionObserver } from 'utils'

// FIXME
// need to get only published
const GET_ARTICLES = gql`
  query($first: Int!, $after: ID, $orderBy: String) {
    articles(first: $first, after: $after, orderBy: $orderBy) {
      edges {
        cursor
        node {
          claps
          date
          published
          slug
          title
          excerpt
          timeToRead
          tags
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`

export default function BlogPage(props) {
  const {
    location: { search },
    data: staticData,
  } = props

  const { edges: posts } = staticData.allMdx
  const { siteMetadata } = staticData.site

  const { loading, error, fetchMore, data } = useQuery(GET_ARTICLES, {
    variables: { first: 4, orderBy: 'date:desc' },
    notifyOnNetworkStatusChange: true,
  })

  const articles = data?.articles?.edges ?? []

  const [ref, [entry]] = useIntersectionObserver()
  useEffect(() => {
    if (entry?.isIntersecting && articles.length)
      fetchMore({
        variables: {
          first: 3,
          after: articles[articles.length - 1].cursor,
          orderBy: 'date:desc',
        },
      })
  }, [entry, articles])

  if (error) {
    navigate('/blogs', { replace: true })
  }

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
      {/*
      <TagSelector {...{ posts, search }}>
        {(posts) =>
      */}
      <div css={{ minHeight: '50vh' }}>
        {articles.map(({ cursor, node }) => (
          <BlogPostPreview key={cursor} post={node} />
        ))}
      </div>
      {/*
        }
      </TagSelector>
      */}
      <div
        ref={ref}
        css={css`
          display: flex;
          justify-content: center;
          width: 100%;
        `}
      >
        <PulseLoader loading={loading} color="gray" />
      </div>
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
