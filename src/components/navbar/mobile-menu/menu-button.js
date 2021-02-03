import React, { useRef, useEffect } from 'react'
import { createMachine, useMachine } from 'utils/robot'
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
  cursor: pointer;
  opacity: ${fade ? '0' : '0.8'};
`
const fadeStyle = css`
  transition: opacity ${FADE}ms;
`

export default function MenuButton({ onMenuClick }) {
  const [state, send] = useMachine(machine, { slug: '' })

  const onTouch = () => {
    send('show')
  }

  useEffect(() => {
    const addListeners = (method) =>
      ['touchstart', 'click'].forEach((event) =>
        document[method](event, onTouch)
      )
    addListeners('addEventListener')
    return () => addListeners('removeEventListener')
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
          onClick={() => onMenuClick()}
          onMouseEnter={() => send('show')}
          css={[
            hamburger(state === 'fading'),
            state === 'fading' ? fadeStyle : '',
          ]}
        >
          <FaBars />
        </div>
      ) : null}
    </>
  )
}
