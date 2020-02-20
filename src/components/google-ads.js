import React from 'react'

export function HeaderAd() {
  return !!Number(process.env.GATSBY_ADSENSE_SHOW) ? (
    <ins
      class="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-9458112330628025"
      data-ad-slot="5551500305"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  ) : null
}

export function FooterAd() {
  return !!Number(process.env.GATSBY_ADSENSE_SHOW) ? (
    <ins
      class="adsbygoogle"
      style={{ display: 'block', textAlign: 'center' }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-9458112330628025"
      data-ad-slot="1594754056"
    />
  ) : null
}
