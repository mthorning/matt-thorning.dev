import React from 'react'
import PropTypes from 'prop-types'
import Navbar from 'components/navbar'
import { css } from '@emotion/react'

const Layout = ({ children }) => (
  <>
    <Navbar />
    <div
      css={(theme) => css`
        margin: 0 auto;
        max-width: ${theme.contentMaxWidth};
        padding: 0px 1.0875rem 1.45rem;
        padding-top: 0;
      `}
    >
      {children}
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
