import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { orangeLink } from '../constants'
import BlogInfo from './blog-info'
import { css } from 'emotion'

const propTypes = {
  post: PropTypes.object.isRequired,
}

function BlogPostPreview({ post }) {
  return (
    <div>
      <h1
        className={css`
          margin-bottom: 8px;
        `}
      >
        <Link className={orangeLink} to={post.frontmatter.path}>
          {post.frontmatter.title}
        </Link>
      </h1>
      <BlogInfo
        className={css`
          margin-bottom: 20px;
        `}
        post={post}
      />
      <p>{post.excerpt}</p>
    </div>
  )
}

BlogPostPreview.propTypes = propTypes
export default BlogPostPreview
