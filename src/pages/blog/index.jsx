import React, { useMemo, useState, useEffect } from 'react'
import { graphql, navigate } from 'gatsby'
import { css } from '@emotion/react'
import Layout from 'layouts/main-layout'
import { BlogPostPreview, Sort } from 'components/blog'
import { Tag } from 'components/tags'
import { SEO } from 'components'
import { useQuery, gql } from '@apollo/client'
import PulseLoader from 'react-spinners/PulseLoader'
import { a11yButton, useIntersectionObserver } from 'utils'
import { useSearchParams } from 'components/tags'

const date = new Intl.DateTimeFormat('en-GB', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const GET_ARTICLES = gql`
  query(
    $orderBy: String!
    $limit: Int
    $page: Int
    $unpublished: Boolean
    $selectedTags: [String]
  ) {
    articles(
      orderBy: $orderBy
      limit: $limit
      page: $page
      unpublished: $unpublished
      selectedTags: $selectedTags
    ) {
      edges {
        claps
        date
        slug
        title
        excerpt
        timeToRead
        tags
      }
      page
      hasNextPage
    }
    tags(selectedTags: $selectedTags) {
      name
      articleCount
    }
  }
`

function Tags({ data, search, children, loading }) {
  const { selectedTags, addTag, removeTag } = useSearchParams(search)

  const [tags, setTags] = useState([])
  useEffect(() => {
    if (data?.tags?.length) setTags(data.tags)
  }, [data?.tags])

  function onTagClick(tag) {
    if (!selectedTags.includes(tag)) {
      addTag(tag)
    } else if (selectedTags.length && selectedTags.includes(tag)) {
      removeTag(tag)
    }
  }

  return (
    <>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          grid-column-gap: 1fr;
          grid-row-gap: 4px;
        `}
      >
        {tags.map(({ name, articleCount }) => (
          <Tag
            css={css`
              position: relative;
              padding: 4px 8px;
              cursor: pointer;
              ${articleCount === 0
                ? `
                      color: #8080804d; 
                      cursor: auto;
                `
                : ''}
              & > span {
                position: absolute;
                top: 4px;
                right: 8px;
              }
            `}
            key={name}
            tag={name}
            count={articleCount || ''}
            selectedTags={selectedTags}
            onTagClick={() => !loading && articleCount > 0 && onTagClick(name)}
          />
        ))}
      </div>
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        `}
      >
        <span
          {...a11yButton(() => removeTag())}
          css={css`
            cursor: pointer;
            font-style: italic;
            visibility: ${selectedTags.length ? 'visible' : 'hidden'};
          `}
        >
          clear
        </span>
        {children}
      </div>
    </>
  )
}

export default function BlogPage(props) {
  const {
    location: { search },
    data: staticData,
  } = props

  const { edges: posts } = staticData.allMdx
  const { siteMetadata } = staticData.site

  const { selectedTags } = useSearchParams(search)
  const [orderBy, setOrderBy] = useState('date:desc')

  const variables = useMemo(
    () => ({
      orderBy,
      selectedTags,
      limit: 4,
      unpublished: process.env.NODE_ENV === 'development',
    }),
    [orderBy, selectedTags.length]
  )

  const { loading, error, fetchMore, data } = useQuery(GET_ARTICLES, {
    variables,
    notifyOnNetworkStatusChange: true,
  })

  const articles = data?.articles?.edges ?? []
  const page = data?.articles?.page
  const hasNextPage = data?.articles?.hasNextPage

  const [ref, [entry]] = useIntersectionObserver()
  useEffect(() => {
    if (entry?.isIntersecting && articles.length && hasNextPage && !loading) {
      fetchMore({
        variables: {
          ...variables,
          page: page + 1,
        },
      })
    }
  }, [entry, articles.length])

  if (error) {
    // navigate('/blog/fb', { replace: true })
    console.error(error)
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
      <div>
        <Tags {...{ loading, search, data }}>
          <Sort {...{ orderBy, setOrderBy }} />
        </Tags>
        {articles.map((article) => (
          <BlogPostPreview
            key={article.slug}
            post={{ ...article, date: date.format(new Date(article.date)) }}
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
