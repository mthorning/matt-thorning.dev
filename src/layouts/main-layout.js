import React from 'react'
import PropTypes from 'prop-types'
import Navbar from 'components/navbar'
import ThemeToggle from 'components/theme-toggle'
import { css } from '@emotion/react'

const main = css`
  display: flex;
  min-height: 100vh;
`

const content = css`
  flex-grow: 1;
`

const themeToggle = css`
  padding: 12px;
  display: flex;
  justify-content: flex-end;
`
const Layout = ({ children }) => (
  <div css={main}>
    <Navbar />
    <div css={content}>
      <div css={themeToggle}>
        <ThemeToggle />
      </div>
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
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
