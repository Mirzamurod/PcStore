import { useSelector } from 'react-redux'
import { Box, Grid } from '@mui/material'
import { Title } from '../../../Components'

const Orders = () => {
    const { dark_mode } = useSelector(state => state.login)

    return (
        <div id='orders'>
            <Box my={3}>
                <Title title='My Orders' />
            </Box>
            <Box className={`fon ${dark_mode ? 'dark' : 'light'}`}>
                <Grid container spacing={4}>
                    <Grid item md={2}>
                        Hello
                    </Grid>
                    <Grid item md={4}>
                        World
                    </Grid>
                    <Grid item md={3}>
                        Hello
                    </Grid>
                    <Grid item md={3}>
                        Hello
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default Orders
