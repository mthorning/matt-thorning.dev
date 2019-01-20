import React, { Component } from 'react'
import { Link } from 'gatsby'

export default class BlogPostPreview extends Component {
  state = {
    color: 'rgba(0, 0, 0, 0.5)',
  }

  color = color => () => {
    this.setState({ color })
  }

  render() {
    const { post } = this.props
    const { color } = this.state
    return (
      <div className="blog-post-preview" key={post.id}>
        <h1
          onMouseOver={this.color('#fc4445')}
          onMouseOut={this.color('rgba(0, 0, 0, 0.5')}
        >
          <Link style={{ color }} to={post.frontmatter.path}>
            {post.frontmatter.title}
          </Link>
        </h1>
        <h6 style={{ marginTop: '0' }}>{post.frontmatter.date}</h6>
        <p>{post.excerpt}</p>
      </div>
    )
  }
}
