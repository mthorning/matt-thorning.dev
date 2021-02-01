import React from 'react'
import { Link } from 'gatsby'
import ThemeToggle from 'components/theme-toggle'
import * as styles from './styles'

export default function DesktopMenu({ menuItems, className, pathRegex }) {
  return (
    <nav css={styles.nav} className={className}>
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
    </nav>
  )
}
