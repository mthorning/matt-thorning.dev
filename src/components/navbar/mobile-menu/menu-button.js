import React, { useMemo, useCallBack, useRef, useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { FaBars } from 'react-icons/fa'
import {
  createMachine,
  state,
  transition,
  invoke,
  guard,
  action,
  reduce,
} from 'robot3'
import { useMachine } from 'react-robot'

const FADE = 5000
const VISIBLE = 3000

const visibleDelay = () => new Promise((res) => setTimeout(res, 3000))

const machine = createMachine({
  visible: invoke(visibleDelay, transition('done', 'fading')),
  fading: state(transition('show', 'visible'), transition('hide', 'invisible')),
  invisible: state(transition('show', 'visible')),
})

export const hamburger = (fade) => css`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 1000;
  display: flex;
  background: var(--bg);
  align-items: center;
  border-radius: 10px;
  padding: 12px;
  box-shadow: var(--boxShadow);
  border: 1px solid gray;
  opacity: ${fade ? '0' : '0.8'};
`
const fadeStyle = css`
  transition: opacity ${FADE}ms;
`

export default function MenuButton({ onMenuClick }) {
  const [current] = useMachine(machine, { slug: '' })
  const {
    service: {
      machine: { current: state },
      send,
    },
  } = current

  const onTouch = () => {
    send('show')
  }

  useEffect(() => {
    window.addEventListener('touchstart', onTouch)
    return () => window.removeEventListener('touchstart', onTouch)
  }, [onTouch])

  const timeout = useRef()
  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current)
    if (state === 'fading') {
      timeout.current = setTimeout(() => send('hide'), 5000)
    }
  }, [state])

  return (
    <>
      {state !== 'invisible' ? (
        <div
          css={[
            hamburger(state === 'fading'),
            state === 'fading' ? fadeStyle : '',
          ]}
        >
          <FaBars onClick={() => onMenuClick()} />
        </div>
      ) : null}
    </>
  )
}
