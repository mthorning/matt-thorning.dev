import React from 'react'
import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'utils'
import { theme, global } from './src/styles'

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <Helmet>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "d6b538317f7d48f8ae58120fe9c1ed3a"}'
        ></script>
      </Helmet>
      <EmotionThemeProvider theme={theme}>
        <ThemeProvider>
          <Global styles={global} />
          {element}
        </ThemeProvider>
      </EmotionThemeProvider>
    </>
  )
}
