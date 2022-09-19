import { Box } from '@mui/material'
import Slider from './Slider'
import Brends from './Brends'
import Products from './Products'

document.title = 'Pc Store'

const HomePage = () => (
    <div>
        <Box id='home' sx={{ mt: '-36px' }}>
            <Slider />
            <Brends />
        </Box>
        <Products />
    </div>
)

export default HomePage
