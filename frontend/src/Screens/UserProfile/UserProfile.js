import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import ListAltIcon from '@mui/icons-material/ListAlt'
import AccountInfo from '../../Components/AccountInfo/AccountInfo'
import Address from './../../Components/Address/Address'
import Orders from './../../Components/Order/Orders'
import { useEffect } from 'react'

const UserProfile = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { dark_mode } = useSelector(state => state.login)

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
                            ACCOUNT DASHBOARD
                        </Typography>
                        {[
                            { name: 'account information', link: '/account', icon: PersonIcon },
                            { name: 'address book', link: '/address', icon: HomeIcon },
                            { name: 'my orders', link: '/orders', icon: ListAltIcon },
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
                                    textTransform: 'capitalize',
                                    fontSize: 14,
                                    justifyContent: 'left',
                                    height: 50,
                                    pl: 3,
                                }}
                            >
                                {button.name}
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
                            Something went wrong!!!
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </Container>
    )
}

export default UserProfile
