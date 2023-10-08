// React Import
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'

// React-i18next
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { eng, ru, uz } from '@/languages'

// Store
import { RootState } from '@/store'

// Mui
import { ThemeProvider, createTheme } from '@mui/material'

if (typeof window !== 'undefined')
  i18next.use(initReactI18next).init({
    resources: {
      uz: { translation: uz },
      ru: { translation: ru },
      eng: { translation: eng },
    },
    lng: JSON.parse(window.localStorage.getItem('lang')!)?.lang ?? 'eng',
    fallbackLng: 'eng',
    interpolation: { escapeValue: false },
  })

const ThemeComponent = ({ children }: { children: ReactNode }) => {
  const { dark_mode } = useSelector((state: RootState) => state.login)
  const theme = createTheme({ palette: { mode: dark_mode ? 'dark' : 'light' } })

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeComponent
