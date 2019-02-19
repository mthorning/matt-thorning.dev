import React from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share'
import { FaEnvelope, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { css } from 'emotion'
import { highlightColor } from '../constants'

export default function ShareButtons({ shareUrl }) {
  const base = css`
    cursor: pointer;
    display: inline-block;
    margin: 10px;
  `
  return (
    <div
      className={css`
        display: flex;
        justify-content: flex-end;
      `}
    >
      <EmailShareButton url={shareUrl}>
        <FaEnvelope
          className={css`
            ${base};
            &:hover {
              color: ${highlightColor};
            }
          `}
        />
      </EmailShareButton>
      <FacebookShareButton url={shareUrl}>
        <FaFacebook
          className={css`
            ${base};
            &:hover {
              color: #3b5998;
            }
          `}
        />
      </FacebookShareButton>
      <LinkedinShareButton url={shareUrl}>
        <FaLinkedin
          className={css`
            ${base};
            &:hover {
              color: #0077b5;
            }
          `}
        />
      </LinkedinShareButton>
      <TwitterShareButton url={shareUrl}>
        <FaTwitter
          className={css`
            ${base};
            &:hover {
              color: #55acee;
            }
          `}
        />
      </TwitterShareButton>
    </div>
  )
}
