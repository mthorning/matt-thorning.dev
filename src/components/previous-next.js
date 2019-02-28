import React from 'react'
import { FaHome, FaBackward, FaForward } from 'react-icons/fa'
import { Link } from 'gatsby'
import { css } from '@emotion/core'

export default function({ previous, next }) {
  const iconWrapper = css`
    font-size: ${theme => theme.footerIconFontSize};
    width: 100%;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid ${theme => theme.textColor};
    display: grid;
    grid-template-columns: 25px 1fr 25px 1fr 25px;
    grid-template-areas: 'prev prev-title home next-title next';
    grid-column-gap: 8px;
    align-items: center;
  `
  const icon = css`
    ${theme => theme.orangeLink}
    display: flex;
  `
  const title = css`
    ${'' /*  This is an important hack for text-overflow */}
    min-width: 0;
    div {
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      ${theme => theme.smallScreen} {
        display: none;
      }
    }
  `
  return (
    <>
      <div css={iconWrapper}>
        <Link
          to={previous.path}
          css={css`
            ${icon}
            grid-area: prev;
          `}
        >
          <FaBackward />
        </Link>

        <div
          css={css`
            ${title}
            grid-area: prev-title;
          `}
        >
          <div>{previous.title}</div>
        </div>

        <Link
          to="/"
          css={css`
            ${icon}
            grid-area: home;
          `}
        >
          <FaHome />
        </Link>

        <div
          css={css`
            ${title}
            grid-area: next-title;
            justify-self: end;
          `}
        >
          <div>{next.title}</div>
        </div>

        <Link to={next.path} css={icon}>
          <FaForward
            css={css`
              ${icon}
              grid-area: next;
            `}
          />
        </Link>
      </div>
    </>
  )
}
