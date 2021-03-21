import React from 'react'
import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react'
import { ThemeProvider } from 'utils'
import { theme, global } from './src/styles'
import { ApolloProvider } from 'utils'

export const wrapRootElement = ({ element }) => {
  return (
    <EmotionThemeProvider theme={theme}>
      <ApolloProvider>
        <ThemeProvider>
          <Global styles={global} />
          {element}
        </ThemeProvider>
      </ApolloProvider>
    </EmotionThemeProvider>
  )
}
