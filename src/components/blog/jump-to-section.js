import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import { IoIosArrowDown } from 'react-icons/io'
import { wrapper, selectedStyle, overlay, bySide } from './jump-to-styles'
import { a11yButton } from 'utils'

const propTypes = {
  headings: PropTypes.array,
}
const defaultProps = {
  headings: [],
}

function JumpToHeading({ headings, slug }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropdownSide, setDropdownSide] = useState(0)

  function sterilise(value) {
    return value.replace(/[^\w\s-]/gi, '')
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
    navigate(`${slug}#${id}`)
  }

  const [windowWidth, setWindowWidth] = useState(0)
  function updateWindowWidth() {
    setWindowWidth(window.innerWidth)
  }
  useEffect(() => {
    updateWindowWidth()
    window.addEventListener('resize', updateWindowWidth)
    return () => window.removeEventListener('resize', updateWindowWidth)
  }, [])

  function getPosition(el) {
    if (!el) return
    setDropdownSide(
      el.getBoundingClientRect().x < windowWidth / 2 ? 'left' : 'right'
    )
  }

  if (!headings.length) return null

  return (
    <>
      <div
        ref={getPosition}
        {...a11yButton(() => setShowDropdown(!showDropdown))}
        css={theme => [wrapper(theme), showDropdown ? selectedStyle : '']}
      >
        Jump to Section
        <IoIosArrowDown />
        {showDropdown && (
          <div css={bySide(dropdownSide)}>
            <ul>
              {headings.map(heading => {
                const { value } = heading
                return (
                  <li key={value} {...a11yButton(() => onSelectChange(value))}>
                    {value}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
      {showDropdown && (
        <div
          css={overlay}
          {...a11yButton(() => setShowDropdown(false), false)}
        />
      )}
    </>
  )
}

JumpToHeading.propTypes = propTypes
JumpToHeading.defaultProps = defaultProps
export default JumpToHeading
