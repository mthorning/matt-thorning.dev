import React, { useMemo, useRef, useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import ClapButton from 'react-clap-button'
import { css } from '@emotion/core'
import { useDatabase } from 'utils/firebase'

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
  const database = useDatabase()
  const clapRef = useMemo(() => database && database.ref(`claps/${slug}`), [
    database,
  ])
  const debounce = useRef(null)

  useEffect(() => {
    if (database) {
      clapRef.on('value', function(snapshot) {
        const claps = snapshot.val()
        if (claps) {
          dispatch(['SET_TOTAL', claps])
        }
      })
    }
    return () => clapRef && clapRef.off()
  }, [clapRef])

  useEffect(() => {
    if (clapRef && clapQueue > 0) {
      debounce.current && clearTimeout(debounce.current)
      debounce.current = setTimeout(() => {
        dispatch(['RESET_QUEUE'])
        clapRef.set(totalClaps)
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
