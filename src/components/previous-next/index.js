import React from 'react'
import { FaHome, FaBackward, FaForward } from 'react-icons/fa'
import { Link } from 'gatsby'
import { icon, iconWrapper, title } from './style'
import { css } from '@emotion/core'

export default function({ previous, next }) {
  return (
    <>
      <div css={iconWrapper}>
        <Link
          to={previous.slug}
          css={theme => css`
            ${icon(theme)}
            grid-area: prev;
          `}
        >
          <FaBackward />
        </Link>

        <div
          css={theme => css`
            ${title(theme)}
            grid-area: prev-title;
          `}
        >
          <div>{previous.title}</div>
        </div>

        <Link
          to="/"
          css={theme => css`
            ${icon(theme)}
            grid-area: home;
          `}
        >
          <FaHome />
        </Link>

        <div
          css={theme => css`
            ${title(theme)}
            grid-area: next-title;
            justify-self: end;
          `}
        >
          <div>{next.title}</div>
        </div>

        <Link to={next.slug} css={icon}>
          <FaForward
            css={theme => css`
              ${icon(theme)}
              grid-area: next;
            `}
          />
        </Link>
      </div>
    </>
  )
}
