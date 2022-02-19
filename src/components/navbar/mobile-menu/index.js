import React from 'react'
import { Link, navigate } from 'gatsby'
import { IoMdClose } from 'react-icons/io'
import { css, Global } from '@emotion/react'
import { createMachine, useMachine } from 'utils'
import ThemeToggle from 'components/theme-toggle'
import MenuButton from './menu-button'
import * as allStyles from '../styles'
import * as mobileStyles from './styles'

const styles = { ...allStyles, ...mobileStyles }

function restoreAppScroll(currentScroll) {
  window.scrollTo(0, currentScroll)
}

const machine = createMachine(
  ({ state, transition, invoke, action, reduce, delay }) => ({
    closed: state(transition('open', 'opening')),
    opening: invoke(
      delay(1000),
      transition(
        'done',
        'opened',
        reduce((ctx) => ({
          ...ctx,
          currentScroll: window.scrollY,
        }))
      )
    ),
    opened: state(
      transition(
        'close',
        'closing',
        reduce((ctx, { slug }) => ({ ...ctx, slug })),
        action((ctx) => {
          restoreAppScroll(ctx.currentScroll)
        })
      )
    ),
    closing: invoke(
      delay(1000),
      transition(
        'done',
        'closed',
        action((ctx) => {
          if (ctx.slug) navigate(ctx.slug)
        })
      )
    ),
  })
)

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
      <div css={styles.bottomRow}>
        <ThemeToggle />
        {state === 'opened' ? (
          <div css={styles.close}>
            <IoMdClose onClick={() => send({ type: 'close' })} />
          </div>
        ) : null}
      </div>
    </>
  )
}

export default function DesktopMenu({ menuItems, className, pathRegex }) {
  const [state, send] = useMachine(machine, { slug: '' })

  return (
    <nav
      css={styles.nav}
      className={`${className} ${state.includes('open') ? 'open' : ''}`}
    >
      {state === 'closed' ? (
        <MenuButton onMenuClick={() => send('open')} />
      ) : (
        <Global
          styles={css`
            scrollbar-width: 0px !important;
            scrollbar-color: var(--bg) !important;
            *::-webkit-scrollbar {
              width: 0px !important;
              height: 0px !important;
              display: none !important;
            }
          `}
        />
      )}
      <Menu {...{ menuItems, pathRegex, state, send }} />
    </nav>
  )
}
