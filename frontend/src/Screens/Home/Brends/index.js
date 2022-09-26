import AliceCarousel from 'react-alice-carousel'
import { Container } from '@mui/material'

import './brends.scss'

const Brends = () => (
    <Container id='brends' sx={{ my: 4 }}>
        <div className='line' />
        <AliceCarousel
            autoPlay
            infinite
            autoPlayDirection='ltr'
            autoPlayInterval={1000}
            animationDuration={3000}
            disableButtonsControls
            disableDotsControls
            responsive={{
                0: { items: 1 },
                576: { items: 2 },
                768: { items: 3 },
                992: { items: 4 },
            }}
        >
            {['msi', 'asus', 'gigabyte', 'rog'].map(item => (
                <div className='photo' key={item}>
                    <img src={`/images/${item}.png`} alt='brends' />
                </div>
            ))}
        </AliceCarousel>
        <div className='line' />
    </Container>
)

export default Brends
