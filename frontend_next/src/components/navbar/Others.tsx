import { memo } from 'react'
import Link from 'next/link'
import { Link as RouterLink, SxProps, Theme, Typography } from '@mui/material'

export const Others = memo(({ sx }: { sx: SxProps<Theme> }) => (
  <RouterLink component={Link} href='/'>
    <Typography sx={sx}>
      <img src='/assets/svg/logo.svg' alt='rasm' />
    </Typography>
  </RouterLink>
))
