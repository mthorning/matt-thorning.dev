import React from 'react'
import { FaHome, FaBackward, FaForward } from 'react-icons/fa'
import { Link } from 'gatsby'
import { css } from 'emotion'
import {
  textColor,
  footerIconFontSize,
  orangeLink,
  smallScreen,
} from '../constants'

export default function({ previous, next }) {
  const iconWrapper = css`
    font-size: ${footerIconFontSize};
    width: 100%;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid ${textColor};
    display: grid;
    grid-template-columns: 25px 1fr 25px 1fr 25px;
    grid-template-areas: 'prev prev-title home next-title next';
    grid-column-gap: 8px;
    align-items: center;
  `
  const icon = css`
    ${orangeLink}
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
      ${smallScreen} {
        display: none;
      }
    }
  `
  return (
    <>
      <div className={iconWrapper}>
        <Link
          to={previous.path}
          className={css`
            ${icon}
            grid-area: prev;
          `}
        >
          <FaBackward />
        </Link>

        <div
          className={css`
            ${title}
            grid-area: prev-title;
          `}
        >
          <div>{previous.title}</div>
        </div>

        <Link
          to="/"
          className={css`
            ${icon}
            grid-area: home;
          `}
        >
          <FaHome />
        </Link>

        <div
          className={css`
            ${title}
            grid-area: next-title;
            justify-self: end;
          `}
        >
          <div>{next.title}</div>
        </div>

        <Link to={next.path} className={icon}>
          <FaForward
            className={css`
              ${icon}
              grid-area: next;
            `}
          />
        </Link>
      </div>
    </>
  )
}
