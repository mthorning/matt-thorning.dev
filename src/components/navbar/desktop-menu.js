import React from 'react'
import { Link } from 'gatsby'
import ThemeToggle from 'components/theme-toggle'
import { useResizeObserver } from 'utils'
import * as styles from './styles'

export default function DesktopMenu({ menuItems, className, pathRegex }) {
  const [ref, { contentRect }] = useResizeObserver({
    subtree: true,
    childList: true,
  })
  const width = { minWidth: `${contentRect?.width ?? 100}px` }

  return (
    <nav css={[styles.nav, width]} className={className}>
      <div ref={ref} css={styles.inner}>
        <ul css={styles.menu}>
          {menuItems.map(({ title, slug }) => (
            <li key={slug}>
              <Link
                className={pathRegex.test(slug) ? 'active' : ''}
                to={slug}
                state={{ menuOpen: true }}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <div css={styles.themeToggle}>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
