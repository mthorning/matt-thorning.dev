import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const propTypes = {
  post: PropTypes.object.isRequired,
}

function BlogPostPreview({ post }) {
  return (
    <div className="blog-post-preview">
      <h1>
        <Link className="orange-link" to={post.frontmatter.path}>
          {post.frontmatter.title}
        </Link>
      </h1>
      <h6 style={{ marginTop: '0' }}>{post.frontmatter.date}</h6>
      <p>{post.excerpt}</p>
    </div>
  )
}

BlogPostPreview.propTypes = propTypes
export default BlogPostPreview
