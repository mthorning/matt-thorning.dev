import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/react'
import Navbar from 'components/navbar'

const viewport = css`
  min-height: 100vh;
  display: flex;
  align-items: stretch;
`
const nav = css`
  z-index: 999;
`
const contentWrapper = css`
  display: block;
  min-width: 0;
  width: 100%;
`
const content = (theme) => css`
  max-width: ${theme.contentMaxWidth};
  padding: 1.5rem 1.0875rem 4rem;
  margin: 0 auto 20px;

  img {
    max-width: 100%;
  }
`
const Layout = ({ children }) => {
  return (
    <div css={viewport}>
      <Navbar css={nav} />
      <div css={contentWrapper}>
        <div css={content}>{children}</div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
