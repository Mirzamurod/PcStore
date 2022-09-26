import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AccountInfo from './AccountInfo'
import Address from './Address'
import Orders from './Order'

const UserProfile = () => {
    const { t } = useTranslation()
    const location = useLocation()
    const navigate = useNavigate()
    const { dark_mode, user } = useSelector(state => state.login)

    document.title = user.fullname ?? 'Pc Store'

    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token) navigate('/login')
    }, [token, navigate])

    return (
        <Container id='userProfile' sx={{ mb: 5 }}>
            <Grid container spacing={4}>
                <Grid item md={3} position='sticky' top={0}>
                    <Box
                        border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`}
                        borderRadius={2}
                        height='100%'
                        overflow='hidden'
                    >
                        <Typography variant='body1' fontWeight={700} textAlign='center' my={3}>
                            {t('account_dashboard')}
                        </Typography>
                        {[
                            { name: 'user_info', link: '/account', icon: PersonIcon },
                            { name: 'address_book', link: '/address', icon: HomeIcon },
                            { name: 'my_orders', link: '/orders', icon: ListAltIcon },
                        ].map((button, index) => (
                            <Button
                                key={index}
                                color={
                                    location.pathname === '/user' + button.link
                                        ? 'error'
                                        : 'inherit'
                                }
                                variant={
                                    location.pathname === '/user' + button.link ? 'contained' : ''
                                }
                                onClick={() => navigate('/user' + button.link)}
                                fullWidth
                                startIcon={<button.icon />}
                                sx={{
                                    fontSize: 14,
                                    justifyContent: 'left',
                                    height: 50,
                                    pl: 3,
                                }}
                            >
                                {t(button.name)}
                            </Button>
                        ))}
                    </Box>
                </Grid>
                <Grid item md={9}>
                    {location.pathname === '/user/account' ? (
                        <AccountInfo />
                    ) : location.pathname === '/user/address' ? (
                        <Address />
                    ) : location.pathname === '/user/orders' ? (
                        <Orders />
                    ) : (
                        <Typography variant='h4' color='red'>
                            {t('wrong')}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserProfile
