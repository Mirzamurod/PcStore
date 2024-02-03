import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { useAppSelector } from '@/store'
import ComputerIcon from '@mui/icons-material/Computer'
import ListAltIcon from '@mui/icons-material/ListAlt'
import GroupIcon from '@mui/icons-material/Group'
import FilterListIcon from '@mui/icons-material/FilterList'
import { useRouter } from 'next/router'
import { TButtonVariant } from '@/types/button'

const AdminSidebar = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation()
  const router = useRouter()

  const { dark_mode } = useAppSelector(state => state.login)

  return (
    <Container sx={{ mb: 5 }}>
      <Grid container spacing={4}>
        <Grid item md={3} position='sticky' top={0}>
          <Box
            border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`}
            borderRadius={2}
            height='calc(100vh - 100px)'
            position='sticky'
            top='64px'
            overflow='hidden'
          >
            <Typography variant='body1' fontWeight={700} textAlign='center' my={3}>
              {t('admin_panel')}
            </Typography>
            {[
              { name: 'pcs', link: '/pcs', icon: <ComputerIcon /> },
              { name: 'orders', link: '/orders', icon: <ListAltIcon /> },
              { name: 'users', link: '/users', icon: <GroupIcon /> },
              { name: 'filters', link: '/filters', icon: <FilterListIcon /> },
            ].map(button => (
              <Button
                key={button.link}
                color={router.pathname === '/admin' + button.link ? 'error' : 'inherit'}
                variant={
                  classNames({
                    contained: router.pathname === '/admin' + button.link,
                  }) as TButtonVariant
                }
                onClick={() => router.replace('/admin' + button.link)}
                fullWidth
                startIcon={button.icon}
                sx={{ fontSize: 14, justifyContent: 'left', height: 50, pl: 3 }}
              >
                {t(button.name)}
              </Button>
            ))}
          </Box>
        </Grid>
        <Grid item md={9}>
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default AdminSidebar
