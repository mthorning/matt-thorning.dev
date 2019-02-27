import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { Header, TypeHello } from 'components'
import { css } from '@emotion/core'

const Layout = ({ children }) => {
  // function Title() {
  //   return (
  //     <h1 css={title}>
  //       <Link to="/">{data.site.siteMetadata.title}</Link>
  //     </h1>
  //   )
  // }
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Header Title={TypeHello} />
          <div
            css={css`
              margin: 0 auto;
              max-width: 960px;
              padding: 0px 1.0875rem 1.45rem;
              padding-top: 0;
            `}
          >
            {children}
          </div>
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
