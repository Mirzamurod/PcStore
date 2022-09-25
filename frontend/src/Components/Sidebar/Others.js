import { memo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Link, Typography } from '@mui/material'
import logo from './../../svg/logo.svg'

export const Others = memo(({ sx }) => (
    <Link component={RouterLink} to='/'>
        <Typography sx={sx}>
            <img src={logo} alt='rasm' />
        </Typography>
    </Link>
))

export const UserSetting = memo(({ dark_mode, url, name }) => {
    const { t } = useTranslation()

    return (
        <Link component={RouterLink} to={url} style={{ width: '100%' }}>
            <Typography
                sx={{
                    py: 1,
                    pr: 2,
                    color: dark_mode ? 'white' : 'black',
                }}
                onClick={() => url === '/' && localStorage.removeItem('token')}
            >
                {t(name)}
            </Typography>
        </Link>
    )
})
