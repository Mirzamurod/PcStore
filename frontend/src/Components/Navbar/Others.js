import { memo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Link, Typography } from '@mui/material'
import logo from './../../assets/svg/logo.svg'

export const Others = memo(({ sx }) => (
    <Link component={RouterLink} to='/'>
        <Typography sx={sx}>
            <img src={logo} alt='rasm' />
        </Typography>
    </Link>
))
