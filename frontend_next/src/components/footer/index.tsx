import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { useAppSelector } from '@/store'
import { Box, Container, Grid, Typography } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import TelegramIcon from '@mui/icons-material/Telegram'

const Footer = () => {
  const { t } = useTranslation()

  const { mode } = useAppSelector(state => state.login)

  return (
    <div id='footer' className={mode === 'dark' ? 'footerfon' : 'footer-fon'}>
      <Container>
        <Grid container spacing={8}>
          <Grid item md={3}>
            <Box sx={{ mb: 3, mt: 1 }}>
              <img src='/assets/svg/logo.svg' alt='rasm' />
            </Box>
            <Typography variant='body2' gutterBottom>
              {t('online_store')}
            </Typography>
          </Grid>
          <Grid item md={3}>
            <Typography variant='h6' gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              {t('information')}
            </Typography>
            {[
              { name: 'home', url: '/' },
              { name: 'products', url: '/products' },
              { name: 'services', url: '/services' },
              { name: 'contact', url: '/contact' },
            ].map(({ name, url }, index) => (
              <Typography
                key={index}
                component={Link}
                href={url}
                display='block'
                color='inherit'
                variant='body2'
                sx={{ mb: 2 }}
              >
                {t(name)}
              </Typography>
            ))}
          </Grid>
          <Grid item md={3}>
            <Typography variant='h6' gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
              {t('contact')}
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
              {t('social_media')}
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
        sx={{ py: 5, mt: 3, borderTop: `1px solid ${mode === 'dark' ? '#ffffff1a' : 'gray'}` }}
        textAlign='center'
        width='100%'
        className={classNames({ 'c-footer': mode === 'dark' })}
      >
        &#169; 2021 pcstore.uz {t('reserved')}
      </Typography>
    </div>
  )
}

export default Footer
