import React, { useCallback, useRef, useEffect, useReducer } from 'react'
import { title as baseStyle, blinkBorder, whiteBorder } from './style'

export default function TypeHello({ className, children }) {
  const mounted = useRef(true)

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

  const tick = useCallback((cb) => {
    let rand = Math.random() * 100 + 20
    setTimeout(() => {
      cb()
    }, rand)
  }, [])

  const writeText = useCallback(
    (stringToType) => {
      return new Promise((resolve) => {
        let i = 0
        function cb() {
          const payload = stringToType[i]
          mounted.current && dispatch({ type: 'add', payload })
          if (mounted.current && i < stringToType.length) {
            tick(cb)
            i++
          } else {
            resolve()
          }
        }

        tick(cb)
      })
    },
    [tick]
  )

  const cursorAnimation = useCallback(() => {
    dispatch({
      type: 'updateClasses',
      payload: [baseStyle, whiteBorder, blinkBorder],
    })
    setTimeout(() => {
      dispatch({
        type: 'updateClasses',
        payload: baseStyle,
      })
    }, 2500)
  }, [])

  const type = useCallback(async () => {
    await writeText(children.split(''))
    cursorAnimation()
  }, [writeText, cursorAnimation, children])

  useEffect(() => {
    type()
    return () => (mounted.current = false)
  }, [type])

  return (
    <h3 className={className} css={state.style}>
      {state.text}
    </h3>
  )
}
