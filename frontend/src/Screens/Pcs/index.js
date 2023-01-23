import Sidebar from './Sidebar'
import { Container, Grid } from '@mui/material'

const Pcs = () => {
    return (
        <Container>
            <Grid container spacing={4}>
                <Grid item md={3}>
                    <Sidebar />
                </Grid>
                <Grid item md={9}></Grid>
            </Grid>
        </Container>
    )
}

export default Pcs
