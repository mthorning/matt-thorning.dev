import React, { useMemo, useCallBack, useRef, useState, useEffect } from 'react'
import { Link, navigate } from 'gatsby'
import { IoMdClose } from 'react-icons/io'
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
import ThemeToggle from 'components/theme-toggle'
import MenuButton from './menu-button'
import * as allStyles from '../styles'
import * as mobileStyles from './styles'

const styles = { ...allStyles, ...mobileStyles }

const delay = () => new Promise((res) => setTimeout(res, 1000))

const machine = createMachine({
  closed: state(transition('open', 'opening')),
  opening: invoke(delay, transition('done', 'opened')),
  opened: state(
    transition(
      'close',
      'closing',
      reduce((ctx, { slug }) => ({ ...ctx, slug }))
    )
  ),
  closing: invoke(
    delay,
    transition(
      'done',
      'closed',
      guard((ctx) => ctx.slug),
      action((ctx) => navigate(ctx.slug))
    ),
    transition('done', 'closed')
  ),
})

const Menu = ({ menuItems, state, send, pathRegex }) => {
  return (
    <>
      <ul css={styles.menu}>
        {menuItems.map(({ title, slug }) => (
          <li key={slug}>
            <Link
              onClick={(e) => {
                e.preventDefault()
                send({ type: 'close', slug })
              }}
              className={pathRegex.test(slug) ? 'active' : ''}
              to={slug}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
      <div css={styles.themeToggle}>
        <ThemeToggle />
      </div>
      {state === 'opened' ? (
        <div css={styles.close}>
          <IoMdClose onClick={() => send('close')} />
        </div>
      ) : null}
    </>
  )
}

export default function DesktopMenu({ menuItems, className, pathRegex }) {
  const [current] = useMachine(machine, { slug: '' })
  const {
    service: {
      machine: { current: state },
      send,
    },
  } = current

  return (
    <nav
      css={styles.nav}
      className={`${className} ${state.includes('open') ? 'open' : ''}`}
    >
      {state === 'closed' ? (
        <MenuButton onMenuClick={() => send('open')} />
      ) : null}
      <Menu {...{ menuItems, pathRegex, state, send }} />
    </nav>
  )
}
