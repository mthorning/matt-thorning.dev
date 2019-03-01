import React from 'react'
import PropTypes from 'prop-types'
import { FaTag } from 'react-icons/fa'
import { css } from '@emotion/core'

function TagDisplay({ tags }) {
  return (
    <div
      css={theme => css`
        ${theme.infoItemStyle}
        margin-bottom: 20px;
      `}
    >
      <FaTag />
      <span>{tags.join(', ')}</span>
    </div>
  )
}

TagDisplay.propTypes = {
  tags: PropTypes.array,
}
TagDisplay.defaultProps = {
  tags: [],
}
export default TagDisplay
