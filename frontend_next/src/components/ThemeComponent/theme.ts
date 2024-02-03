import themeConfig from '@/configs/themeConfig'
import { createTheme } from '@mui/material'

const theme = (dark_mode: boolean) =>
  createTheme({
    palette: { mode: dark_mode ? 'dark' : 'light' },
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
    },
  })

export default theme
