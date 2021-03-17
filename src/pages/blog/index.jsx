import React, { useMemo, useState, useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import { css } from '@emotion/react'
import Layout from 'layouts/main-layout'
import { BlogPostPreview, Sort } from 'components/blog'
import { Tag } from 'components/tags'
import { SEO } from 'components'
import { useQuery, gql } from '@apollo/client'
import PulseLoader from 'react-spinners/PulseLoader'
import { useIntersectionObserver } from 'utils'
import { useSearchParams } from 'components/tags'

const date = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const GET_ARTICLES = gql`
  query(
    $orderBy: String!
    $first: Int
    $after: String
    $unpublished: Boolean
    $tags: [String]
  ) {
    articles(
      orderBy: $orderBy
      first: $first
      after: $after
      unpublished: $unpublished
      tags: $tags
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
const GET_TAGS = gql`
  query {
    tags {
      name
      articles
    }
  }
`

function getTotals(tags) {
  const totals = {}
  tags.forEach((tag) => {
    tag.articles.forEach((article) => {
      if (Object.prototype.hasOwnProperty.call(totals, article)) {
        totals[article]++
      } else {
        totals[article] = 1
      }
    })
  })
  return totals
}

// function Tags({ search, setSelectedArticles }) {
//   const { selectedTags, addTag, removeTag } = useSearchParams(search)
//   const { error, data } = useQuery(GET_TAGS)
//   const tags = data?.tags ?? []

//   function onTagClick(tag) {
//     if (!selectedTags.includes(tag)) {
//       addTag(tag)
//     } else if (selectedTags.length && selectedTags.includes(tag)) {
//       removeTag(tag)
//     }
//   }
//   const selected = useMemo(
//     () => tags.filter(({ name }) => selectedTags.includes(name)),
//     [selectedTags]
//   )

//   const selectedArticles = useMemo(() => {
//     const selectedTotals = getTotals(selected)
//     return Object.entries(selectedTotals).reduce(
//       (articles, [article, total]) =>
//         total === selectedTags.length ? [...articles, article] : articles,
//       []
//     )
//   }, [selected, selectedTags])

//   useEffect(() => {
//     setSelectedArticles(selectedArticles)
//   }, [selectedArticles])

//   const unselected = tags
//     .filter(
//       ({ name, articles }) =>
//         !selectedTags.includes(name) &&
//         (!selectedArticles.length ||
//           articles.some((article) => selectedArticles.includes(article)))
//     )
//     .map((tag) => {
//       const count = tag.articles.filter(
//         (article) =>
//           !selectedArticles.length || selectedArticles.includes(article)
//       ).length

//       return { ...tag, count }
//     })

//   if (error) return null

//   return (
//     <div
//       css={css`
//         display: flex;
//         flex-wrap: wrap;
//         justify-content: flex-start;
//         margin-bottom: 12px;
//       `}
//     >
//       {[...selected, ...unselected].map(({ name, count }) => (
//         <Tag
//           key={name}
//           tag={name}
//           count={count}
//           selectedTags={selectedTags}
//           onTagClick={() => onTagClick(name)}
//         />
//       ))}
//     </div>
//   )
// }

export default function BlogPage(props) {
  const {
    location: { search },
    data: staticData,
  } = props

  const { edges: posts } = staticData.allMdx
  const { siteMetadata } = staticData.site

  const [orderBy, setOrderBy] = useState('date:desc')

  const variables = {
    orderBy,
    first: 4,
    unpublished: process.env.NODE_ENV === 'development',
  }
  const { loading, error, fetchMore, data } = useQuery(GET_ARTICLES, {
    variables,
    notifyOnNetworkStatusChange: true,
  })

  const articles = data?.articles?.edges ?? []
  const { hasNextPage } = data?.articles?.pageInfo ?? {}

  const [ref, [entry]] = useIntersectionObserver()
  useEffect(() => {
    if (entry?.isIntersecting && articles.length && hasNextPage)
      fetchMore({
        variables: {
          ...variables,
          after: articles[articles.length - 1].cursor,
        },
      })
  }, [entry, articles])

  if (error) {
    // navigate('/blog/fb', { replace: true })
    console.error(error)
  }

  // const tags = useMemo(() => <Tags {...{ search, setSelectedArticles }} />, [
  //   search,
  //   setSelectedArticles,
  // ])
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
      <div>
        <Sort {...{ orderBy, setOrderBy }} />
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
