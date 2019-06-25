import React from 'react'
import PropTypes from 'prop-types'
import { FiTag } from 'react-icons/fi'
import { tagDisplay } from './style'

function TagDisplay({ tags }) {
  return (
    <div css={tagDisplay}>
      <FiTag />
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
