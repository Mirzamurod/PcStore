import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import classNames from 'classnames'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import ComputerIcon from '@mui/icons-material/Computer'
import ListAltIcon from '@mui/icons-material/ListAlt'

const AdminPanel = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const { dark_mode } = useSelector(state => state.login)

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) navigate('/login')
    }, [token, navigate])

    return (
        <Container id='admin' sx={{ mb: 5 }}>
            <Grid container spacing={4}>
                <Grid item md={3} position='sticky' top={0}>
                    <Box
                        border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`}
                        borderRadius={2}
                        height='100%'
                        overflow='hidden'
                    >
                        <Typography variant='body1' fontWeight={700} textAlign='center' my={3}>
                            {t('admin_panel')}
                        </Typography>
                        {[
                            { name: 'pcs', link: '/pcs', icon: <ComputerIcon /> },
                            { name: 'add_pc', link: '/orders', icon: <ListAltIcon /> },
                            { name: 'orders', link: '/users', icon: '' },
                        ].map((button, index) => (
                            <Button
                                key={index}
                                color={
                                    location.pathname === '/admin' + button.link
                                        ? 'error'
                                        : 'inherit'
                                }
                                variant={classNames({
                                    contained: location.pathname === '/admin' + button.link,
                                })}
                                onClick={() => navigate('/admin' + button.link)}
                                fullWidth
                                // startIcon={<button.icon />}
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
                {/* <Grid item md={9}>
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
                </Grid> */}
            </Grid>
        </Container>
    )
}

export default AdminPanel
