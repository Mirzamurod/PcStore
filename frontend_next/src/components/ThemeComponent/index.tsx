// React Import
import { ReactNode } from 'react'

// React-i18next
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { eng, ru, uz } from '@/languages'

// Store
import { useAppSelector } from '@/store'

// Mui
import { ThemeProvider } from '@mui/material'
import theme from './theme'

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
  const { mode } = useAppSelector(state => state.login)
  // const theme = createTheme({ palette: { mode: mode ? 'dark' : 'light' } })

  return <ThemeProvider theme={theme(mode)}>{children}</ThemeProvider>
}

export default ThemeComponent
