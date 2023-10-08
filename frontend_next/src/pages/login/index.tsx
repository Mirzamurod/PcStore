import { ReactNode } from 'react'
import BlankLayout from '@/components/BlankLayout'
import { Container, Grid } from '@mui/material'
import Title from '@/components/Title'
import { useTranslation } from 'react-i18next'
import SignIn from '@/components/Login/SignIn'
import SignUp from '@/components/Login/SignUp'

const Login = () => {
  const { t } = useTranslation()

  return (
    <Container sx={{ mb: 10 }}>
      <Title title={t('hello_there')} subtitle={t('continue')} />
      <Grid container spacing={20}>
        <Grid item md={6}>
          <SignIn />
        </Grid>
        <Grid item md={6}>
          <SignUp />
        </Grid>
      </Grid>
    </Container>
  )
}

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Login.guestGuard = true

export default Login
