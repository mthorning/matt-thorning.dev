import React, { useCallback, useRef, useEffect, useReducer } from 'react'
import { title as baseStyle, blinkBorder, whiteBorder } from './style'

export default function TypeHello({ children }) {
  const mounted = useRef(true)

  const initialState = {
    text: '',
    style: (theme) => [baseStyle, whiteBorder].map((a) => a(theme)),
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
          style: (theme) => action.payload(theme),
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

  const deleteText = useCallback((stop) => {
    return new Promise((resolve) => {
      let i = 0
      const tick = setInterval(() => {
        mounted.current && dispatch({ type: 'del' })
        i++
        if (mounted.current && i === stop) {
          clearInterval(tick)
          resolve()
        }
      }, 150)
    })
  }, [])

  const cursorAnimation = useCallback(() => {
    dispatch({
      type: 'updateClasses',
      payload: (theme) =>
        [baseStyle, whiteBorder, blinkBorder].map((a) => a(theme)),
    })
    setTimeout(() => {
      dispatch({
        type: 'updateClasses',
        payload: (theme) => [baseStyle(theme)],
      })
    }, 2500)
  }, [])

  const type = useCallback(async () => {
    await writeText(children.split(''))
    // await deleteText(5)
    // await writeText('Code />'.split(''))
    cursorAnimation()
  }, [writeText, deleteText, cursorAnimation])

  useEffect(() => {
    type()
    return () => (mounted.current = false)
  }, [type])

  return <h3 css={(theme) => state.style(theme)}>{state.text}</h3>
}
