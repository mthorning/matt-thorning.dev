import React, { useState, useLayoutEffect } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { wrapper, selectedStyle, overlay, bySide } from './styles'
import { a11yButton } from 'utils'

export function Dropdown({ children, value, className }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const [dropdownSide, setDropdownSide] = useState(0)

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

  return (
    <>
      <div
        ref={getPosition}
        {...a11yButton(() => setShowDropdown(!showDropdown))}
        className={className}
        css={[wrapper, showDropdown ? selectedStyle : '']}
      >
        <span>{value}</span>
        <IoIosArrowDown />
        {showDropdown && (
          <div css={bySide(dropdownSide)}>
            <ul>{children}</ul>
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
