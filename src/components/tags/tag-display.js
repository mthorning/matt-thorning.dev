import React from 'react'
import PropTypes from 'prop-types'
import { FaTag } from 'react-icons/fa'
import { tagDisplay } from './style'

function TagDisplay({ tags }) {
  return (
    <div css={tagDisplay}>
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
