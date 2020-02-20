import React, { useEffect } from 'react'

export default function HeaderAdd() {
  useEffect(() => {
    ;(window.adsbygoogle = window.adsbygoogle || []).push({})
  }, [])
  return (
    <ins
      class="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-9458112330628025"
      data-ad-slot="5551500305"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}
