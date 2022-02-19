import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi'
import { Dropdown } from 'components'

export function Sort({ orderBy, setOrderBy }) {
  const [desc, setDesc] = useState(orderBy.includes(':desc'))
  const sortBys = ['date', 'claps']
  const [sortBy, setSortBy] = useState(
    sortBys.find((s) => s === orderBy.split(':')[0])
  )

  useEffect(() => {
    setOrderBy(`${sortBy}${desc ? ':desc' : ''}`)
  }, [desc, sortBy, setOrderBy])
  return (
    <div
      css={css`
        display: flex;
        justify-content: flex-end;
      `}
    >
      <Dropdown
        value={sortBy}
        css={css`
          width: 60px;
          user-select: none;
          div {
            width: 80px;
          }
          li {
            user-select: none;
          }
        `}
      >
        {sortBys
          .filter((sort) => sort !== sortBy)
          .map((s) => (
            <li key={s} role="presentation" onClick={() => setSortBy(s)}>
              {s}
            </li>
          ))}
      </Dropdown>
      <div
        css={css`
          color: var(--color);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--color);
          border-radius: 2px;
          width: 30px;
          margin-left: 4px;
        `}
        role="presentation"
        onClick={() => setDesc((current) => !current)}
      >
        {desc ? <HiOutlineSortDescending /> : <HiOutlineSortAscending />}
      </div>
    </div>
  )
}
