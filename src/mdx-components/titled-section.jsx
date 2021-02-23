import React from 'react'
import { FaPenSquare, FaGithubSquare } from 'react-icons/fa'
import { css } from '@emotion/react'

function mdLinks(text) {
  return text.replace(/\[(.*)\]\((https?:\/\/.*)\)/, '<a href="$2">$1</a>')
}

const Links = ({ github, blogs }) => (
  <div
    css={css`
      display: flex;
      align-items: center;
      a {
        margin-left: 8px;
        color: var(--color);
        display: inline-flex;
        align-items: center;
        font-size: 1.4em;
      }

      a:hover {
        color: var(--linkHover);
      }
    `}
  >
    {blogs ? (
      <a href={blogs}>
        <FaPenSquare />
      </a>
    ) : null}
    {github ? (
      <a href={github}>
        <FaGithubSquare />
      </a>
    ) : null}
  </div>
)

export default function TitledSection({
  title,
  subtitle,
  info,
  children,
  github,
  blogs,
}) {
  return (
    <div
      css={css`
        margin-bottom: 32px;
        * {
          margin-bottom: 0;
        }
          span {
            border-bottom: 1px solid var(--color);
            padding: 0 32px 16px 0;
          }
        p {
            padding-top: 8px;
            margin-top: 8px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
        `}
      >
        <span>
          {title ? <h3>{title}</h3> : null}
          {subtitle ? <h4>{subtitle}</h4> : null}
          {info ? <h6>{info}</h6> : null}
        </span>
        <Links {...{ github, blogs }} />
      </div>
      <p dangerouslySetInnerHTML={{ __html: mdLinks(children) }} />
    </div>
  )
}
