import { Fragment } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card, CardActions, CardContent, Button, Typography, Grid, Link } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCreative, Pagination } from 'swiper'
import { encode } from 'js-base64'
import { Loading } from '../'

import 'swiper/css/effect-creative'
import 'swiper/css/pagination'
import './pcs.scss'

const Pcs = ({ isLoading, pcs, pc }) => {
    const { t } = useTranslation()

    return (
        <Grid container spacing={{ xl: 8, lg: 6, md: 4, sm: 2, xs: 0 }}>
            {isLoading && <Loading mt={5} />}
            {pc && pc}
            {!isLoading &&
                pcs?.length > 0 &&
                pcs?.map((item, ind) => (
                    <Grid
                        item
                        pt={{ sm: '16px !important' }}
                        lg={3}
                        md={4}
                        sm={6}
                        xs={12}
                        key={ind}
                    >
                        <Card
                            sx={{
                                boxShadow: 0,
                                backgroundImage:
                                    'linear-gradient(rgb(255 255 255 / 0%), rgb(255 255 255 / 0%))',
                            }}
                        >
                            {item?.stock_price > 0 && (
                                <Fragment>
                                    <img
                                        src='/images/stock.png'
                                        style={{ width: '70px', position: 'absolute' }}
                                        alt='rasm'
                                    />
                                    <p
                                        className={`stock ${
                                            item?.stock_price > 10 ? 'left-78' : 'left-88'
                                        }`}
                                    >
                                        10%
                                    </p>
                                </Fragment>
                            )}
                            <Swiper
                                loop={true}
                                pagination={true}
                                grabCursor={true}
                                effect={'creative'}
                                creativeEffect={{
                                    prev: {
                                        shadow: true,
                                        origin: 'left center',
                                        translate: ['-5%', 0, -200],
                                        rotate: [0, 100, 0],
                                    },
                                    next: {
                                        origin: 'right center',
                                        translate: ['5%', 0, -200],
                                        rotate: [0, -100, 0],
                                    },
                                }}
                                modules={[EffectCreative, Pagination]}
                                className='mySwiper6'
                            >
                                {item?.image.map((img, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={img} alt='rasm' width='100%' />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant='subtitle1'
                                    component='div'
                                    fontWeight={700}
                                >
                                    <Link
                                        to={`/pc/${encode(encode(item?._id))}`}
                                        component={RouterLink}
                                        color='inherit'
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        {item?.name}
                                    </Link>
                                </Typography>
                                <Typography
                                    variant='body2'
                                    gutterBottom
                                    textTransform='uppercase'
                                    sx={{ opacity: '.7' }}
                                >
                                    {item?.cpu} {item?.ddr} {item?.videocard}
                                    <br />
                                    {item?.hdd} {item?.ssd_data} {item?.ssd_m2}
                                </Typography>
                                <Typography variant='body1' gutterBottom sx={{ opacity: '.7' }}>
                                    {t('warranty')} {item?.warranty} {t('year')}
                                    {item.waranty > 1 && t('s')}
                                </Typography>
                                {item?.stock_price > 0 && (
                                    <Typography variant='h6' component='del' sx={{ opacity: '.7' }}>
                                        {item?.stock_price.toLocaleString()} UZS
                                    </Typography>
                                )}
                                <Typography variant='h5' sx={{ fontWeight: 700 }} color='error'>
                                    {item?.price.toLocaleString()} UZS
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    color='error'
                                    variant='contained'
                                    startIcon={<ShoppingCartIcon />}
                                >
                                    {t('order')}
                                </Button>
                            </CardActions>
                            <CardActions>
                                <Button
                                    component={RouterLink}
                                    fullWidth
                                    endIcon={<ArrowForwardIosIcon />}
                                    sx={{ color: 'inherit' }}
                                    to={`/pc/${encode(encode(item?._id))}`}
                                >
                                    {t('details')}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    )
}

export default Pcs
