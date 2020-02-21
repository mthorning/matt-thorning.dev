import React from 'react'

export function HeaderAd() {
  return !!Number(process.env.GATSBY_ADSENSE_SHOW) ? (
    <ins
      class="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client={process.env.GATSBY_ADSENSE_ID}
      data-ad-slot="5551500307"
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
      data-ad-client={process.env.GATSBY_ADSENSE_ID}
      data-ad-slot="1594754056"
    />
  ) : null
}
