import React from 'react'
import { wrapper, iconWrapper } from './style'
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
} from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'

const brands = {
  email: '#ffd900',
  facebook: '#3b5998',
  linkedin: '#0077b5',
  reddit: '#ff4500',
  twitter: '#55acee',
  whatsapp: '#25d366',
}

export default function ShareButtons({ shareUrl, title }) {
  const url = shareUrl && shareUrl.split('#')[0]
  function IconWrapper({ children, color }) {
    return <div css={(theme) => iconWrapper(theme, color)}>{children}</div>
  }

  return (
    <div css={wrapper}>
      <IconWrapper color={brands.email}>
        <EmailShareButton subject={title} url={url}>
          <FaEnvelope />
        </EmailShareButton>
      </IconWrapper>

      <IconWrapper color={brands.twitter}>
        <TwitterShareButton title={title} url={url}>
          <FaTwitter />
        </TwitterShareButton>
      </IconWrapper>

      <IconWrapper color={brands.facebook}>
        <FacebookShareButton quote={title} url={url}>
          <FaFacebook />
        </FacebookShareButton>
      </IconWrapper>

      <IconWrapper color={brands.reddit}>
        <RedditShareButton title={title} url={url}>
          <FaReddit />
        </RedditShareButton>
      </IconWrapper>

      <IconWrapper color={brands.linkedin}>
        <LinkedinShareButton title={title} url={url}>
          <FaLinkedin />
        </LinkedinShareButton>
      </IconWrapper>

      <IconWrapper color={brands.whatsapp}>
        <WhatsappShareButton title={title} url={url}>
          <IoLogoWhatsapp />
        </WhatsappShareButton>
      </IconWrapper>
    </div>
  )
}
