import React from 'react'
import { Link } from 'gatsby'
import { title as titleStyle } from './style'
import { css } from '@emotion/core'

export default function Title({ title }) {
  const hover = theme => css`
    &:hover {
      color: ${theme.secondaryColor};
    }
  `
  return (
    <Link css={{ textDecoration: 'none' }} to="/">
      <h1 css={theme => [titleStyle, hover].map(a => a(theme))}>{title}</h1>
    </Link>
  )
}
