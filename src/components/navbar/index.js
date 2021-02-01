import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import { StaticQuery, graphql } from 'gatsby'
import { FaBars } from 'react-icons/fa'
import { IoMdClose } from 'react-icons/io'
import ThemeToggle from 'components/theme-toggle'
import * as styles from './styles'

const Menu = ({ data, onClose }) => {
  const { pathname } = useLocation()
  const re = new RegExp(`^/${pathname.split('/')[1]}(/.*)?$`)

  const items = [
    ...data.site.siteMetadata.menuItems,
    ...data.allMdx.edges.map(({ node: { frontmatter } }) => frontmatter),
  ]
  return (
    <>
      <ul css={styles.menu}>
        {items.map(({ title, slug }) => (
          <li key={slug}>
            <Link
              className={re.test(slug) ? 'active' : ''}
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
      <div css={styles.close}>
        <IoMdClose onClick={() => onClose()} />
      </div>
    </>
  )
}
export default function Navbar({ className, menuOpen }) {
  const [open, setOpen] = useState(menuOpen)
  useEffect(() => {
    if (menuOpen) setOpen(false)
  }, [menuOpen])
  return (
    <StaticQuery
      query={graphql`
        query NavbarQuery {
          allMdx(filter: { frontmatter: { type: { eq: "page" } } }) {
            edges {
              node {
                frontmatter {
                  title
                  slug
                }
              }
            }
          }
          site {
            siteMetadata {
              menuItems {
                title
                slug
              }
            }
          }
        }
      `}
      render={(data) => (
        <nav css={styles.nav} className={`${className} ${open ? 'open' : ''}`}>
          {!open ? (
            <div css={styles.hamburger}>
              <FaBars onClick={() => setOpen(true)} />
            </div>
          ) : null}
          <Menu data={data} onClose={() => setOpen(false)} />
        </nav>
      )}
    />
  )
}
