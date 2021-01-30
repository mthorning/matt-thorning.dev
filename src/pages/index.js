import React from 'react'
import { css } from '@emotion/react'
import { graphql } from 'gatsby'
import Layout from 'layouts/main-layout'
import { SEO } from 'components'

const Section = ({ children }) => (
  <div
    css={css`
      padding: 3rem auto;
    `}
  >
    {children}
  </div>
)

export default function Page({ data }) {
  const { siteMetadata } = data.site
  return (
    <Layout>
      <SEO
        title={siteMetadata.title}
        description={siteMetadata.description}
        author={siteMetadata.author}
      />
      <h1>Matt Thorning</h1>
      <h2>I work with people to make great software.</h2>
      <Section>
        <p>
          I have been working professionally as a JavaScript developer since
          2017 but my interests expand beyond just JavaScript. At the time of
          writing this my favourites are Rust, ReasonMl and SvelteJs. Take a
          look at my Github profile to see what I'm playing with at the moment.
        </p>
      </Section>
      <Section>
        <p>
          My other passion is landscape photography, if that sounds like
          something that interests you then please check out
          mattthorningphotography.com.
        </p>
      </Section>
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
