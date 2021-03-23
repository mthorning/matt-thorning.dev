import React, { useRef, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withTheme, css } from '@emotion/react'
import loadable from '@loadable/component'

const ClapButton = loadable(() => import('./clap-button'))

const reducer = (state, [type, payload]) => {
  switch (type) {
    case 'INC_QUEUE':
      return {
        ...state,
        totalClaps: state.totalClaps + 1,
        clapQueue: state.clapQueue + 1,
      }
    case 'RESET_QUEUE':
      return {
        ...state,
        clapQueue: 0,
      }
    case 'SET_TOTAL':
      return {
        ...state,
        totalClaps: payload,
      }
    default:
      return state
  }
}

function Clap({ claps, addClaps, theme }) {
  const initialState = {
    clapQueue: 0,
    totalClaps: 0,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { clapQueue, totalClaps } = state
  const debounce = useRef(null)

  useEffect(() => {
    if (claps) {
      dispatch(['SET_TOTAL', claps])
    }
  }, [claps])

  useEffect(() => {
    if (clapQueue > 0) {
      debounce.current && clearTimeout(debounce.current)
      debounce.current = setTimeout(() => {
        addClaps(clapQueue)
        dispatch(['RESET_QUEUE'])
      }, 700)
    }
  }, [clapQueue, addClaps])

  return (
    <div
      css={(theme) => css`
        padding: 8px;
        display: flex;
        align-items: center;
        max-width: 50%;
        margin-top: 70px;
        font-size: 16px;
        ${theme.smallScreen} {
          max-width: 100%;
          margin-top: 50px;
          font-size: 12px;
        }
      `}
    >
      <ClapButton
        theme={theme}
        count={clapQueue}
        countTotal={totalClaps}
        incrementCount={() => dispatch(['INC_QUEUE'])}
      />
      <p
        css={css`
          margin: 0 10px;
          line-height: 1.5em;
        `}
      >
        If you've found this helpful then let me know with a clap or two!
      </p>
    </div>
  )
}

Clap.propTypes = { slug: PropTypes.string.isRequired }
export default withTheme(Clap)
