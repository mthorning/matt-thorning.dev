import React, { useRef, useEffect } from 'react'
import { createMachine, useMachine } from 'utils'
import { css } from '@emotion/react'
import { FaBars } from 'react-icons/fa'

const FADE = 5000
const VISIBLE = 3000

const machine = createMachine(({ state, transition, invoke, delay }) => ({
  visible: invoke(delay(VISIBLE), transition('done', 'fading')),
  fading: state(transition('show', 'visible'), transition('hide', 'invisible')),
  invisible: state(transition('show', 'visible')),
}))

export const hamburger = (fade) => css`
  position: fixed;
  bottom: 8vh;
  right: 8vw;
  z-index: 1000;
  display: flex;
  background: var(--bg);
  align-items: center;
  border-radius: 10px;
  padding: 12px;
  border: 1px solid gray;
  opacity: ${fade ? '0' : '0.8'};
  svg {
    fill: var(--color);
  }
`
const fadeStyle = css`
  transition: opacity ${FADE}ms;
`

export default function MenuButton({ onMenuClick }) {
  const [state, send] = useMachine(machine, { slug: '' })

  useEffect(() => {
    const onInteract = (e) => {
      e.stopPropagation()
      send('show')
    }

    const addListeners = (method) =>
      ['touchstart', 'click'].forEach((event) =>
        document[method](event, onInteract)
      )
    addListeners('addEventListener')
    return () => addListeners('removeEventListener')
  }, [send, state])

  const timeout = useRef()
  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current)
    if (state === 'fading') {
      timeout.current = setTimeout(() => send('hide'), FADE)
    }
  }, [state, send])

  return (
    <button
      aria-label="open menu"
      onClick={() => onMenuClick()}
      onMouseEnter={() => send('show')}
      css={[
        hamburger(state === 'fading'),
        state === 'fading' ? fadeStyle : '',
        { visibility: state === 'invisible' ? 'hidden' : 'visible' },
      ]}
    >
      <FaBars />
    </button>
  )
}
