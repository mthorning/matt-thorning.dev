import React, { useState, useEffect, createContext, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const initialTheme = typeof window !== 'undefined' ? window.__theme : 'light'
  const [theme, setTheme] = useState(initialTheme)
  useEffect(() => (window.__onThemeChange = () => setTheme(window.__theme)), [])

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
