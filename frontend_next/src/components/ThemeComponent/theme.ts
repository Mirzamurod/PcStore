import themeConfig from '@/configs/themeConfig'
import { Mode } from '@/types/themeConfig'
import { createTheme } from '@mui/material'

const theme = (mode: Mode) =>
  createTheme({
    palette: { mode: mode === 'dark' ? 'dark' : 'light' },
    components: {
      MuiButton: {
        defaultProps: { color: 'error' },
        styleOverrides: { root: () => ({ textTransform: 'inherit' }) },
      },
      MuiRating: {
        styleOverrides: {
          root: () => ({
            color: themeConfig.themeColor,
            '& .MuiRating-iconEmpty': { color: '#e90021' },
          }),
        },
      },
      MuiTextField: { defaultProps: { color: 'error', size: 'small', variant: 'standard' } },
      MuiFormControl: { defaultProps: { color: 'error', size: 'small', variant: 'standard' } },
    },
  })

export default theme
