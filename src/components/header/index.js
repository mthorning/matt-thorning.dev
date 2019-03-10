import PropTypes from 'prop-types'
import React from 'react'
import PersonalLinks from './personal-links'
import { wrapper, innerWrapper, titleWrapper } from './style'
export { default as TypeHello } from './type-hello'
export { default as Title } from './title'

const Header = ({ children }) => {
  return (
    <div css={wrapper}>
      <div css={innerWrapper}>
        <PersonalLinks />
        <div css={titleWrapper}>{children}</div>
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