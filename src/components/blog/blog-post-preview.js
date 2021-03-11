import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { BlogInfo } from 'components/blog'

const propTypes = {
  post: PropTypes.object.isRequired,
}

function BlogPostPreview({ post }) {
  return (
    <div css={{ marginTop: '40px' }}>
      <h1 css={{ margin: 0 }}>
        <Link css={(theme) => theme.orangeLink} to={post.slug}>
          {post.title}
        </Link>
      </h1>
      <BlogInfo post={post} />
      <p>{post.excerpt}</p>
    </div>
  )
}

BlogPostPreview.propTypes = propTypes
export default BlogPostPreview
