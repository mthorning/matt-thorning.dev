import React from 'react'
import { Link, navigate } from 'gatsby'
import { IoMdClose } from 'react-icons/io'
import { createMachine, useMachine } from 'utils/robot'
import ThemeToggle from 'components/theme-toggle'
import MenuButton from './menu-button'
import * as allStyles from '../styles'
import * as mobileStyles from './styles'

const styles = { ...allStyles, ...mobileStyles }

function stopAppScroll() {
  const el = document.querySelector('body')
  const { scrollY } = window
  el.style.position = 'fixed'
  el.style.top = -1 * scrollY + 'px'
  el.style.right = '0'
  el.style.left = '0'
  return scrollY
}

function restoreAppScroll(currentScroll) {
  const el = document.querySelector('body')
  el.style.position = 'static'
  el.style.top = ''
  el.style.right = ''
  el.style.left = ''
  window.scrollTo(0, currentScroll)
}

const machine = createMachine(
  ({ state, transition, invoke, guard, action, reduce, delay }) => ({
    closed: state(transition('open', 'opening')),
    opening: invoke(
      delay(1000),
      transition(
        'done',
        'opened',
        reduce((ctx) => ({
          ...ctx,
          currentScroll: stopAppScroll(),
        }))
      )
    ),
    opened: state(
      transition(
        'close',
        'closing',
        reduce((ctx, { slug }) => ({ ...ctx, slug })),
        action((ctx) => restoreAppScroll(ctx.currentScroll))
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
  const [state, send] = useMachine(machine, { slug: '' })

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
