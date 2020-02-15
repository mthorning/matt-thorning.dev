import React, { useRef, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import useClaps from 'utils/useClaps'
import loadable from '@loadable/component'

const ClapButton = loadable(() => import('./react-clap-button'))

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

function Clap({ slug, theme }) {
  const initialState = {
    clapQueue: 0,
    totalClaps: 0,
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const { clapQueue, totalClaps } = state
  const debounce = useRef(null)
  const [claps, setClaps] = useClaps(slug)

  useEffect(() => {
    if (claps) {
      dispatch(['SET_TOTAL', claps])
    }
  }, [claps])

  useEffect(() => {
    if (clapQueue > 0) {
      debounce.current && clearTimeout(debounce.current)
      debounce.current = setTimeout(() => {
        dispatch(['RESET_QUEUE'])
        setClaps(totalClaps)
      }, 700)
    }
  }, [clapQueue, setClaps, totalClaps])

  return (
    <div
      css={theme => css`
        padding: 8px;
        display: flex;
        align-items: center;
        max-width: 50%;
        font-size: 16px;
        ${theme.smallScreen} {
          max-width: 100%;
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
        `}
      >
        If you've found this helpful then let me know with a clap or two!
      </p>
    </div>
  )
}

Clap.propTypes = { slug: PropTypes.string.isRequired }
export default withTheme(Clap)
