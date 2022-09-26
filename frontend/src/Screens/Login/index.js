import { Container, Grid } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Title } from '../../Components'
import SignIn from './SignIn'
import SignUp from './SignUp'

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

export default Login
