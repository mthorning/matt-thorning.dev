import { css } from '@emotion/react'

export default css`
  table {
    border: 1px solid var(--color);
    background-color: var(--bg);
    width: 100%;
    border-collapse: collapse;
  }
  table td,
  table th {
    border: 1px solid var(--color);
    padding: 6px 4px;
    text-align: center;
  }
  table thead {
    background: var(--color);
    border-bottom: 1px solid var(--color);
  }
  table thead th {
    font-weight: bold;
    color: var(--bg);
    border-left: 2px solid var(--bg);
  }
  table thead th:first-of-type {
    border-left: none;
  }
`
