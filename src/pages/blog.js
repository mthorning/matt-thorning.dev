import React, { useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import { css } from '@emotion/react'
import Layout from 'layouts/main-layout'
import { BlogPostPreview } from 'components/blog'
import { SEO } from 'components'
import { useQuery, gql } from '@apollo/client'
import PulseLoader from 'react-spinners/PulseLoader'
import { useIntersectionObserver } from 'utils'
import { HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi'
import { FiCalendar } from 'react-icons/fi'
import ClapIcon from 'components/clap/ClapIcon'

const date = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

// FIXME
// need to get only published
const GET_ARTICLES = gql`
  query($first: Int!, $after: ID, $orderBy: String, $unpublished: Boolean) {
    articles(
      first: $first
      after: $after
      orderBy: $orderBy
      unpublished: $unpublished
    ) {
      edges {
        cursor
        node {
          claps
          date
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

function Sort() {
  const [desc, setDesc] = React.useState(false)
  const [claps, setClaps] = React.useState(false)
  const onClick = (handler) => () => handler((current) => !current)
  return (
    <div
      css={css`
        & > * {
          cursor: pointer;
        }
      `}
    >
      {desc ? (
        <HiOutlineSortAscending onClick={onClick(setDesc)} />
      ) : (
        <HiOutlineSortDescending onClick={onClick(setDesc)} />
      )}
      {claps ? (
        <FiCalendar onClick={onClick(setClaps)} />
      ) : (
        <ClapIcon onClick={onClick(setClaps)} />
      )}
    </div>
  )
}

export default function BlogPage(props) {
  const {
    location: { search },
    data: staticData,
  } = props

  const { edges: posts } = staticData.allMdx
  const { siteMetadata } = staticData.site

  const variables = {
    first: 4,
    orderBy: 'date:desc',
    unpublished: process.env.NODE_ENV === 'development',
  }

  const { loading, error, fetchMore, data } = useQuery(GET_ARTICLES, {
    variables,
    notifyOnNetworkStatusChange: true,
  })

  const articles = data?.articles?.edges ?? []
  const hasNextPage = data?.articles?.pageInfo?.hasNextPage

  const [ref, [entry]] = useIntersectionObserver()
  useEffect(() => {
    if (entry?.isIntersecting && articles.length && hasNextPage)
      fetchMore({
        variables: {
          ...variables,
          first: 3,
          after: articles[articles.length - 1].cursor,
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
      <div css={{ minHeight: '50vh' }}>
        <Sort />
        {articles.map(({ cursor, node }) => (
          <BlogPostPreview
            key={cursor}
            post={{ ...node, date: date.format(new Date(node.date)) }}
          />
        ))}
      </div>
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
