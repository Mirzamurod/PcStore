import { useSelector } from 'react-redux'
import { Box, Typography, Button } from '@mui/material'
import { Title } from '../../../Components'

const Address = () => {
    const { dark_mode } = useSelector(state => state.login)

    return (
        <div id='address'>
            <Box my={3}>
                <Title title='User Information' />
            </Box>
            <Box className={`fon ${dark_mode ? 'dark' : 'light'}`}>
                <Typography variant='h6'>Default Shipping Address</Typography>
                <Typography variant='body2'>100114</Typography>
                <Typography variant='body2'>Uzbekistan, Tashkent,</Typography>
                <Typography variant='body2'>Yunusobod, Nurmakon 110</Typography>
                <Typography variant='body2'>Mahmud Nurmuhamedov</Typography>
                <Typography variant='body2'>+998 99 090-0998</Typography>
                <Box display='flex' justifyContent='end' mt={2}>
                    <Button color='inherit' size='large'>
                        Edit
                    </Button>
                    <Button color='error' size='large' sx={{ ml: 2 }}>
                        Delete
                    </Button>
                </Box>
            </Box>
            <Button
                variant='contained'
                color='error'
                size='large'
                sx={{ textTransform: 'capitalize', my: 4 }}
            >
                Add new address
            </Button>
        </div>
    )
}

export default Address
