import React, { useEffect, useReducer } from 'react'
import { css } from '@emotion/core'

const baseStyle = css`
  margin: 0;
  color: #fff;
  min-height: 39.27px;
  display: inline-block;
`
const whiteBorder = css`
  border-right: 3px solid #fff;
`
const blinkBorder = css`
  @keyframes blink {
    50% {
      border-right: 3px solid #fc4445;
    }
  }
  animation: blink 0.5s step-end infinite alternate;
`

export default function LandingPage({ className }) {
  const initialState = {
    text: '',
    style: [baseStyle, whiteBorder],
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return { ...state, text: [state.text, action.payload].join('') }
      case 'del':
        return {
          ...state,
          text: state.text.substring(0, state.text.length - 1),
        }
      case 'updateClasses':
        return {
          ...state,
          style: action.payload,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  function tick(cb) {
    let rand = Math.random() * 100 + 200
    setTimeout(() => {
      cb()
    }, rand)
  }

  function writeText(stringToType) {
    return new Promise(resolve => {
      let i = 0
      function cb() {
        const payload = stringToType[i]
        dispatch({ type: 'add', payload })
        if (i < stringToType.length) {
          tick(cb)
          i++
        } else {
          resolve()
        }
      }

      tick(cb)
    })
  }

  function deleteText(stop) {
    return new Promise(resolve => {
      let i = 0
      const tick = setInterval(() => {
        dispatch({ type: 'del' })
        i++
        if (i === stop) {
          clearInterval(tick)
          resolve()
        }
      }, 150)
    })
  }

  function cursorAnimation() {
    dispatch({
      type: 'updateClasses',
      payload: [baseStyle, whiteBorder, blinkBorder],
    })
    setTimeout(() => {
      dispatch({ type: 'updateClasses', payload: [baseStyle] })
    }, 3500)
  }

  async function type() {
    await writeText('<HelloWorld'.split(''))
    await deleteText(5)
    await writeText('Code />'.split(''))
    cursorAnimation()
  }

  useEffect(() => {
    type()
  }, [])

  return <h1 css={state.style}>{state.text}</h1>
}
