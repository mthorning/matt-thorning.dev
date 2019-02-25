import React from 'react'
import { css } from '@emotion/core'
import { textColor } from '../constants'
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
import { smallScreen, footerIconFontSize } from '../constants'

const brands = {
  email: '#ffd900',
  facebook: '#3b5998',
  linkedin: '#0077b5',
  reddit: '#ff4500',
  twitter: '#55acee',
  whatsapp: '#25d366',
}

export default function ShareButtons({ shareUrl, title }) {
  function IconWrapper({ children, color }) {
    return (
      <div
        css={css`
          color: ${textColor};
          font-size: ${footerIconFontSize};
          width: 40px;
          height: 40px;
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
      css={css`
        display: flex;
        justify-content: flex-end;

        ${smallScreen} {
          justify-content: center;
        }
      `}
    >
      <IconWrapper color={brands.email}>
        <EmailShareButton subject={title} url={shareUrl}>
          <FaEnvelope />
        </EmailShareButton>
      </IconWrapper>

      <IconWrapper color={brands.twitter}>
        <TwitterShareButton title={title} url={shareUrl}>
          <FaTwitter />
        </TwitterShareButton>
      </IconWrapper>

      <IconWrapper color={brands.facebook}>
        <FacebookShareButton quote={title} url={shareUrl}>
          <FaFacebook />
        </FacebookShareButton>
      </IconWrapper>

      <IconWrapper color={brands.reddit}>
        <RedditShareButton title={title} url={shareUrl}>
          <FaReddit />
        </RedditShareButton>
      </IconWrapper>

      <IconWrapper color={brands.linkedin}>
        <LinkedinShareButton title={title} url={shareUrl}>
          <FaLinkedin />
        </LinkedinShareButton>
      </IconWrapper>

      <IconWrapper color={brands.whatsapp}>
        <WhatsappShareButton title={title} url={shareUrl}>
          <FaWhatsapp />
        </WhatsappShareButton>
      </IconWrapper>
    </div>
  )
}
