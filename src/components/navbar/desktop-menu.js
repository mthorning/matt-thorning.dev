import React from 'react'
import { Link } from 'gatsby'
import ThemeToggle from 'components/theme-toggle'
import * as styles from './styles'

const useWidth = () => {
  const ref = React.useRef()
  const [width, setWidth] = React.useState(0)
  const clientWidth = ref?.current?.clientWidth

  React.useLayoutEffect(() => {
    setWidth(clientWidth)
  }, [clientWidth])

  return [ref, { minWidth: `${width}px` }]
}

export default function DesktopMenu({ menuItems, className, pathRegex }) {
  const [ref, width] = useWidth()

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
