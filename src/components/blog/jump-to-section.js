import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { IoIosArrowDown } from 'react-icons/io'
import { wrapper, selectedStyle, overlay } from './jump-to-styles'

const propTypes = {
  headings: PropTypes.array,
}
const defaultProps = {
  headings: [],
}

function JumpToHeading({ headings, path }) {
  if (!headings.length) return null
  const [showDropdown, setShowDropdown] = useState(false)

  function sterilise(value) {
    return value.replace(/[^\w\s]/gi, '')
  }

  function lower(value) {
    return value
      .split('')
      .map(letter => letter.toLowerCase())
      .join('')
  }

  function hyphenate(value) {
    return value.replace(/\s/gi, '-')
  }

  function onSelectChange(value) {
    const id = lower(hyphenate(sterilise(value)))
    navigate(`${path}#${id}`)
  }

  return (
    <>
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        css={theme => [wrapper(theme), showDropdown ? selectedStyle : '']}
      >
        Jump to Section
        <IoIosArrowDown />
        {showDropdown && (
          <div>
            <ul>
              {headings.map(heading => {
                const { value } = heading
                return (
                  <li key={value} onClick={() => onSelectChange(value)}>
                    {value}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      {showDropdown && (
        <div css={overlay} onClick={() => setShowDropdown(false)} />
      )}
    </>
  )
}

JumpToHeading.propTypes = propTypes
JumpToHeading.defaultProps = defaultProps
export default JumpToHeading
