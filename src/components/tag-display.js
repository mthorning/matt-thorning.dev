import React from 'react'
import PropTypes from 'prop-types'
import { FaTag } from 'react-icons/fa'
import { infoItemStyle } from '../constants'
import { css } from 'emotion'

function TagDisplay({ tags }) {
  return (
    <div
      className={css`
        ${infoItemStyle}
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
