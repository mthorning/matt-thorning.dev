import React from 'react'
import { css } from '@emotion/react'
import { graphql } from 'gatsby'
import Layout from 'layouts/main-layout'
import { SEO } from 'components'
import TypeHello from 'components/type-hello'

export default function Page({ data }) {
  const { siteMetadata } = data.site
  return (
    <Layout>
      <SEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        author={siteMetadata.author}
      />
      <div
        css={css`
            padding-left: 32px;
            * {
                user-select: none;
            `}
      >
        <h1
          css={css`
            color: var(--color);
            font-size: 8vw;
            margin-top: 10vh;
            margin-bottom: 0;
          `}
        >
          Matt Thorning
        </h1>
        <TypeHello>Software Developer</TypeHello>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        description
        title
        author
      }
    }
  }
`
