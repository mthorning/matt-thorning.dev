import React, { useEffect, useReducer } from 'react'
import { css } from '@emotion/core'

export default function LandingPage({ className }) {
  const initialState = {
    text: '',
  }
  const reducer = (state, action) => {
    switch (action.type) {
      case 'add':
        return { text: [state.text, action.payload].join('') }
      case 'del':
        return {
          text: state.text.substring(0, state.text.length - 1),
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  function tick(cb) {
    let rand = Math.round(Math.random() * 100) + 200
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

  async function type() {
    await writeText('<HelloWorld'.split(''))
    await deleteText(5)
    await writeText('Code />'.split(''))
  }

  useEffect(() => {
    type()
  }, [])

  return (
    <h1
      css={css`
        margin: 0;
        color: #fff;
        min-height: 39.27px;
      `}
    >
      {state.text}
    </h1>
  )
}
