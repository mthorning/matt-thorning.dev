import React from 'react'
import { css } from '@emotion/react'
import { graphql } from 'gatsby'
import Layout from 'layouts/main-layout'
import { SEO } from 'components'
import TypeHello from 'components/type-hello'

const respFont = ({ minFont, maxFont, minScreen, maxScreen }) => css`
  font-size: calc(
    ${minFont}px + (${maxFont} - ${minFont}) * (100vw - ${minScreen}px) /
      (${maxScreen}-${minScreen})
  );
`

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
            ${respFont({
              minFont: 30,
              maxFont: 100,
              minScreen: 300,
              maxScreen: 1500,
            })}
            color: var(--color);
            margin-top: 10vh;
            margin-bottom: 0;
          `}
        >
          Matt Thorning
        </h1>
        <TypeHello
          css={css`
            ${respFont({
              minFont: 25,
              maxFont: 60,
              minScreen: 300,
              maxScreen: 1500,
            })}
          `}
        >
          Software Developer
        </TypeHello>
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
