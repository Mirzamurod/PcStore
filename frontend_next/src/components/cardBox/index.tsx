import { ReactNode, forwardRef } from 'react'
import { Box, SxProps } from '@mui/material'
import { useAppSelector } from '@/store'

const CardBox = forwardRef(({ children, sx }: { children?: ReactNode; sx?: SxProps }, ref) => {
  const { mode } = useAppSelector(state => state.login)

  return (
    <Box ref={ref} sx={{ ...sx }} className={`fon ${mode === 'dark' ? 'dark' : 'light'}`}>
      {children}
    </Box>
  )
})

export default CardBox
