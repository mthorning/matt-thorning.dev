import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import PersonalLinks from './personal-links'
import { css } from 'emotion'

const Header = ({ siteTitle }) => {
  const wrapper = css`
    background: #fc4445;
    margin-bottom: 1.45rem;
  `
  const inner = css`
    margin: 0 auto;
    max-width: 960;
    padding: 1rem 1.0875rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      margin: 0;
    }
  `
  const link = css`
    color: white;
    text-decoration: none;
    &:hover {
      color: #fff;
    }
  `

  return (
    <div className={wrapper}>
      <div className={inner}>
        <h1>
          <Link to="/" className={link}>
            {siteTitle}
          </Link>
        </h1>
        <PersonalLinks />
      </div>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
