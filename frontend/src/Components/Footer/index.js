import { useSelector } from 'react-redux'
import { Box, Container, Grid, Typography } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import TelegramIcon from '@mui/icons-material/Telegram'
import logo from './../../svg/logo.svg'

import './footer.scss'

const Footer = () => {
    const { dark_mode } = useSelector(state => state.login)

    return (
        <div id='footer' className={dark_mode ? 'footerfon' : 'footer-fon'}>
            <Container>
                <Grid container spacing={8}>
                    <Grid item md={3}>
                        <Box sx={{ mb: 3, mt: 1 }}>
                            <img src={logo} alt='rasm' />
                        </Box>
                        <Typography variant='body2' gutterBottom>
                            Online store of computer equipment and components
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography variant='h6' gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                            Information
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 2 }}>
                            Home
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 2 }}>
                            Products
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 2 }}>
                            Services
                        </Typography>
                        <Typography variant='body2' sx={{ mb: 2 }}>
                            Contact
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Typography variant='h6' gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                            Contact
                        </Typography>
                        <Box sx={{ display: 'flex', mb: 2.5 }}>
                            <LocationOnOutlinedIcon />
                            <Typography variant='body2' sx={{ ml: 1 }}>
                                100114, Uzbekistan, Tashkent, Yunusobod, Nurmakon 111
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 2.5 }}>
                            <LocalPhoneOutlinedIcon />
                            <Typography variant='body2' sx={{ ml: 1 }}>
                                +998 (94) 656-57-06
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', mb: 2.5 }}>
                            <EmailOutlinedIcon />
                            <Typography variant='body2' sx={{ ml: 1 }}>
                                pcstoreuz@gmail.com
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item md={3}>
                        <Typography variant='h6' gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                            Social media
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <InstagramIcon sx={{ mr: 1 }} />
                            <TelegramIcon sx={{ mr: 1 }} />
                            <YouTubeIcon sx={{ mr: 1 }} />
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Typography
                sx={{ py: 5, mt: 3, borderTop: `1px solid ${dark_mode ? '#ffffff1a' : 'gray'}` }}
                textAlign={'center'}
                width='100%'
                className={`${dark_mode && 'c-footer'}`}
            >
                &#169; 2021 pcstore.uz All rights reserved.
            </Typography>
        </div>
    )
}

export default Footer
