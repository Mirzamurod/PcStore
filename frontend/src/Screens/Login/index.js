import { Container, Grid } from '@mui/material'
import { Title } from '../../Components'
import SignIn from './SignIn'
import SignUp from './SignUp'

const Login = () => {
    return (
        <Container sx={{ mb: 10 }}>
            <Title title={'Hello there!'} subtitle='Please sign in or create account to continue' />
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
