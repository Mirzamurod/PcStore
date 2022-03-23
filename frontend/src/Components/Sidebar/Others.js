import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'
import logo from './../../svg/logo.svg'

export const Others = memo(({ sx }) => {
    return (
        <Link to='/'>
            <Typography sx={sx}>
                <img src={logo} alt='rasm' />
            </Typography>
        </Link>
    )
})

export const UserSetting = memo(({ sx, dark_mode, url, name }) => {
    return (
        <Link to={url} style={{ width: '100%' }}>
            <Typography
                sx={{
                    py: 1,
                    pr: 2,
                    color: dark_mode ? 'white' : 'black',
                }}
            >
                {name}
            </Typography>
        </Link>
    )
})
