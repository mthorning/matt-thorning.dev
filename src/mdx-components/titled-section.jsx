import React from 'react'
import { css } from '@emotion/react'

export default function TitledSection({ subOne, subTwo, subThree, children }) {
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
      {subOne ? <h3>{subOne}</h3> : null}
      {subTwo ? <h4>{subTwo}</h4> : null}
      {subThree ? <h6>{subThree}</h6> : null}
      <p>{children}</p>
    </div>
  )
}
