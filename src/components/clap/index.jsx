import React, { useRef, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import useClaps from 'utils/useClaps'
import loadable from '@loadable/component'

const ClapButton = loadable(() => import('@mthorning/react-clap-button'))

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

function Clap({ slug }) {
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
  }, [clapQueue])

  return (
    <div
      css={css`
        padding: 8px;
      `}
    >
      <ClapButton
        count={clapQueue}
        countTotal={totalClaps}
        incrementCount={() => dispatch(['INC_QUEUE'])}
      />
    </div>
  )
}

Clap.propTypes = { slug: PropTypes.string.isRequired }
export default Clap
