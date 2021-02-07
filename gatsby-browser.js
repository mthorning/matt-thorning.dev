import React from 'react'
import { ThemeProvider as EmotionThemeProvider, Global } from '@emotion/react'
import { ThemeProvider } from 'utils'
import { theme, global } from './src/styles'

export const wrapRootElement = ({ element }) => {
  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeProvider>
        <Global styles={global} />
        {element}
      </ThemeProvider>
    </EmotionThemeProvider>
  )
}
