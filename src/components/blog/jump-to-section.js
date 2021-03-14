import React from 'react'
import PropTypes from 'prop-types'
import { AnchorLink } from 'gatsby-plugin-anchor-links'
import { Dropdown } from 'components'

function JumpToHeading({ slug, headings }) {
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

  if (!headings.length) return null
  return (
    <Dropdown value="Jump to Section">
      {headings.map((heading) => {
        const { value } = heading
        return (
          <li key={value}>
            <AnchorLink to={makeHashLink(value)} title={value} />
          </li>
        )
      })}
    </Dropdown>
  )
}

JumpToHeading.propTypes = {
  headings: PropTypes.array,
}
JumpToHeading.defaultProps = {
  headings: [],
}

export default JumpToHeading
