import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    Container,
    Grid,
} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { getPcs } from '../../redux/pcs/pcs'
import { Loading } from '../Loading'
import { encode } from 'js-base64'
import './pcs.scss'

const Pcs = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { dark_mode } = useSelector(state => state.login)
    const { isLoading, pcs } = useSelector(state => state.pcs)

    useEffect(() => {
        dispatch(getPcs())
    }, [dispatch])

    return (
        <Container id='pcs' sx={{ py: 6 }}>
            <Grid container spacing={8}>
                {isLoading && <Loading />}
                {!isLoading &&
                    pcs?.length > 0 &&
                    pcs?.map((item, ind) => (
                        <Grid item md={3} key={ind} position='relative'>
                            <Card
                                sx={{
                                    boxShadow: 0,
                                    backgroundImage:
                                        'linear-gradient(rgb(255 255 255 / 0%), rgb(255 255 255 / 0%))',
                                }}
                            >
                                {item?.stock_price > 0 && (
                                    <>
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
                                    </>
                                )}
                                <CardMedia
                                    component='img'
                                    height='auto'
                                    image={item?.image[0]}
                                    alt='green'
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant='subtitle1'
                                        component='div'
                                        sx={{ fontWeight: 700 }}
                                    >
                                        {item?.name}
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
                                        Warranty {item?.warranty} year{item?.warranty > 1 && 's'}
                                    </Typography>
                                    {item?.stock_price > 0 && (
                                        <Typography
                                            variant='h6'
                                            component='del'
                                            sx={{ opacity: '.7' }}
                                        >
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
                                        order
                                    </Button>
                                </CardActions>
                                <CardActions>
                                    <Button
                                        fullWidth
                                        endIcon={<ArrowForwardIosIcon />}
                                        sx={{ color: `${dark_mode ? 'white' : 'black'}` }}
                                        onClick={() => navigate(`/pc/${encode(encode(item?._id))}`)}
                                    >
                                        details
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
            </Grid>
        </Container>
    )
}

export default Pcs
