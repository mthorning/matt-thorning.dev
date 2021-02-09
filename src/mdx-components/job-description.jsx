import React from 'react'
import { css } from '@emotion/react'

export default function JobDescription({
  company,
  role,
  start,
  end,
  children,
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
      <h3>{company}</h3>
      <h4>{role}</h4>
      <h6>
        {start} - {end}
      </h6>
      <p>{children}</p>
    </div>
  )
}
