import React, { useState, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
import { IoIosArrowDown } from 'react-icons/io'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import {
  wrapper,
  selectedStyle,
  overlay,
  dropdown,
  bySide,
} from './jump-to-styles'
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
      .map((letter) => letter.toLowerCase())
      .join('')
  }

  function hyphenate(value) {
    return value.replace(/\s/gi, '-')
  }

  const makeHashLink = (value) =>
    `${slug}#${lower(hyphenate(sterilise(value)))}`

  const [windowWidth, setWindowWidth] = useState(0)
  function updateWindowWidth() {
    // Need to wait for a bit else we get the wrong width
    setTimeout(() => setWindowWidth(window.innerWidth), 0)
  }
  useLayoutEffect(() => {
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
        css={[wrapper, showDropdown ? selectedStyle : '']}
      >
        <span>
          Jump to Section
          <IoIosArrowDown />
        </span>
        {showDropdown && (
          <div css={bySide(dropdownSide)}>
            <ul>
              {headings.map((heading) => {
                const { value } = heading
                return (
                  <li key={value}>
                    <AnchorLink to={makeHashLink(value)} title={value} />
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
