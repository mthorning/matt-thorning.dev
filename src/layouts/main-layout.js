import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Header, { Title, TypeHello } from 'components/header'
import { HeaderAd, FooterAd } from 'components/google-ads'
import { css } from '@emotion/core'

const Layout = ({ children, animateHeader }) => {
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
          <Header>
            {animateHeader ? (
              <TypeHello />
            ) : (
              <Title title={`<${data.site.siteMetadata.title} />`} />
            )}
          </Header>
          <HeaderAd />
          <div
            css={theme => css`
              margin: 0 auto;
              max-width: ${theme.contentMaxWidth};
              padding: 0px 1.0875rem 1.45rem;
              padding-top: 0;
            `}
          >
            {children}
          </div>
          <FooterAd />
        </>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
