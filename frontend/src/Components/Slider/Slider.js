import { useSelector } from 'react-redux'
import { Box, Button, Container, Grid, Rating, styled, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Swiper, SwiperSlide } from 'swiper/react'
import { data } from '../data'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import './slider.scss'

import { Autoplay, EffectFade, Pagination } from 'swiper'

const Slider = () => {
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': { color: '#e90021' },
        '& .MuiRating-iconEmpty': { color: '#e90021' },
    })

    const { dark_mode } = useSelector(state => state.login)

    return (
        <div id='slider'>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                loop={true}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Autoplay, EffectFade, Pagination]}
                className='mySwiper'
            >
                {data?.map((item, index) => (
                    <SwiperSlide
                        key={index}
                        className='react-carousel'
                        style={{ position: 'relative', width: '100%' }}
                    >
                        <div
                            style={{ backgroundImage: `url(${item.image})` }}
                            className={`foncolor ${!dark_mode && 'light'}`}
                        />
                        <Container>
                            <Grid container>
                                <Grid item md={5}>
                                    <Typography
                                        variant='h3'
                                        fontWeight={500}
                                        sx={{ mb: 2, zIndex: 100 }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Box display='flex' sx={{ mb: 2 }}>
                                        <StyledRating
                                            name='half-rating-read'
                                            defaultValue={item.rating}
                                            precision={0.5}
                                            readOnly
                                        />
                                        <Typography
                                            sx={{
                                                fontSize: '1.125rem',
                                                fontWeight: 400,
                                                ml: 1,
                                                opacity: 0.7,
                                            }}
                                        >
                                            ({item.views.toLocaleString()} reviews)
                                        </Typography>
                                        <Typography
                                            variant='body1'
                                            color='green'
                                            border='1px solid gray'
                                            borderRadius='4px'
                                            sx={{ ml: 1, px: 1 }}
                                            textTransform='uppercase'
                                        >
                                            {item.have ? 'in order' : 'out of order'}
                                        </Typography>
                                    </Box>
                                    <Typography variant='body1'>{item.performance}</Typography>
                                    <Typography color='red' sx={{ mb: 2 }}>
                                        Warranty {item.waranty} year{item.waranty > 1 && 's'}
                                    </Typography>
                                    <Box display='flex' color='red' mb={!item.stock && 7}>
                                        <Typography variant='h3' fontWeight={700}>
                                            {item.price.toLocaleString()}
                                        </Typography>
                                        <Typography variant='h5' mt='auto' ml={1} fontWeight={700}>
                                            UZS
                                        </Typography>
                                    </Box>
                                    {item.stock && (
                                        <Typography variant='h5' component='del' fontWeight={700}>
                                            {item.stock.toLocaleString()}
                                        </Typography>
                                    )}
                                    <Box display='flex' sx={{ mt: 3 }}>
                                        <Button
                                            variant='contained'
                                            color='error'
                                            startIcon={<ShoppingCartIcon />}
                                            size='large'
                                            sx={{ mr: 2 }}
                                        >
                                            order
                                        </Button>
                                        <Button size='large' color='error'>
                                            details
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item md={7}>
                                    <Box
                                        sx={{
                                            backgroundImage: `url(${item.image})`,
                                            backgroundSize: 'contain',
                                            backgroundPosition: 'center center',
                                            backgroundRepeat: 'no-repeat',
                                            height: '100%',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default Slider
