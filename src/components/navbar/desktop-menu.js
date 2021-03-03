import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import ThemeToggle from 'components/theme-toggle'
import { useResizeObserver } from 'utils'
import * as styles from './styles'

export default function DesktopMenu({ menuItems, className, pathRegex }) {
  const [ref, { contentRect }] = useResizeObserver()
  const [width, setWidth] = useState(
    typeof window !== 'undefined'
      ? localStorage.getItem('menuWidth') || 155
      : 155
  )

  useEffect(() => {
    window.localStorage.setItem('menuWidth', width)
  }, [width])

  useEffect(() => {
    if (contentRect?.width) {
      setWidth(contentRect.width)
    }
  }, [contentRect])

  const minWidth = { minWidth: `${width}px` }

  return (
    <nav css={[styles.nav, minWidth]} className={className}>
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
