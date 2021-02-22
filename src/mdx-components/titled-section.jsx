import React from 'react'
import { FaPenSquare, FaGithubSquare } from 'react-icons/fa'
import { css } from '@emotion/react'

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
        p {
            border-top: 1px solid var(--color);
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
        {title ? <h3>{title}</h3> : null}
        <Links {...{ github, blogs }} />
      </div>
      {subtitle ? <h4>{subtitle}</h4> : null}
      {info ? <h6>{info}</h6> : null}
      <p>{children}</p>
    </div>
  )
}
