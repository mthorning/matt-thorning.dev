import React from 'react'
import { css } from 'emotion'
import { headingTextColor } from '../constants'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaReddit,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa'
import { smallScreen } from '../constants'

export default function ShareButtons({ shareUrl, title }) {
  function IconWrapper({ children, color }) {
    return (
      <div
        className={css`
          color: ${headingTextColor};
          width: 40px;
          height: 40px;
          font-size: 25px;
          display: flex;
          padding: 8px;
          align-items: center;
          justify-content: center;
          margin-top: 40px;

          div {
            cursor: pointer;
            transition: 0.3s ease;
          }
          &:hover div {
            font-size: 45px;
            color: ${color};
          }
        `}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={css`
        display: flex;
        justify-content: flex-end;

        ${smallScreen} {
          justify-content: center;
        }
      `}
    >
      <IconWrapper color="#ffd900">
        <EmailShareButton subject={title} url={shareUrl}>
          <FaEnvelope />
        </EmailShareButton>
      </IconWrapper>

      <IconWrapper color="#3b5998">
        <FacebookShareButton quote={title} url={shareUrl}>
          <FaFacebook />
        </FacebookShareButton>
      </IconWrapper>

      <IconWrapper color="#0077b5">
        <LinkedinShareButton title={title} url={shareUrl}>
          <FaLinkedin />
        </LinkedinShareButton>
      </IconWrapper>

      <IconWrapper color="#ff4500">
        <RedditShareButton title={title} url={shareUrl}>
          <FaReddit />
        </RedditShareButton>
      </IconWrapper>

      <IconWrapper color="#55acee">
        <TwitterShareButton title={title} url={shareUrl}>
          <FaTwitter />
        </TwitterShareButton>
      </IconWrapper>

      <IconWrapper color="#25d366">
        <WhatsappShareButton title={title} url={shareUrl}>
          <FaWhatsapp />
        </WhatsappShareButton>
      </IconWrapper>
    </div>
  )
}
