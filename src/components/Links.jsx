import React from 'react'
import { Link } from 'gatsby'

export default function() {
  return (
    <div style={wrapperStyle}>
      <Link className="orange-link" to="/">
        Check out my other posts
      </Link>
      <div>
        <a
          style={{ marginRight: '10px' }}
          className="orange-link"
          href="https://twitter.com/thorning_m"
        >
          Twitter
        </a>
        <a className="orange-link" href="https://github.com/mthorning">
          Github
        </a>
      </div>
    </div>
  )
}

const wrapperStyle = {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
}
