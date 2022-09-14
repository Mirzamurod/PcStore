import { useSelector } from 'react-redux'
import { Box, Button, Grid, Rating, styled, Typography } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import './aboutpc.scss'

const AboutPc = () => {
    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: '#e90021',
        },
        '& .MuiRating-iconEmpty': {
            color: '#e90021',
        },
    })

    const { pc, reviewNum, ratingNum } = useSelector(state => state.pc)

    return (
        <Grid item md={6}>
            <Typography variant='h3' fontWeight={500} sx={{ mb: 2, zIndex: 100 }}>
                {pc?.name}
            </Typography>
            <Box display='flex' sx={{ mb: 2 }}>
                <StyledRating name='pc' defaultValue={ratingNum} precision={0.5} readOnly />
                <Typography
                    sx={{
                        fontSize: '1.125rem',
                        fontWeight: 400,
                        ml: 1,
                        opacity: 0.7,
                    }}
                >
                    ({reviewNum?.toLocaleString()} review{reviewNum > 1 && 's'})
                </Typography>
                <Typography
                    variant='body1'
                    color='green'
                    border='1px solid gray'
                    borderRadius='4px'
                    sx={{ ml: 1, px: 1 }}
                    textTransform='uppercase'
                >
                    {pc?.have ? 'in order' : 'out of order'}
                </Typography>
            </Box>
            <Typography variant='body1'>{pc?.performance}</Typography>
            <Box display='flex' color='red' mb={3}>
                <Typography variant='h3' fontWeight={700}>
                    {pc?.price?.toLocaleString()}
                </Typography>
                <Typography variant='h5' mt='auto' ml={1} fontWeight={700}>
                    UZS
                </Typography>
            </Box>
            {pc?.stock && (
                <Typography variant='h5' component='del' fontWeight={700}>
                    {pc?.stock.toLocaleString()}
                </Typography>
            )}
            <Box>
                <Typography textTransform='uppercase' fontWeight={700} fontSize='19px'>
                    Description
                </Typography>
                <Typography variant='h6' fontWeight={400}>
                    {pc?.description}
                </Typography>
            </Box>
            <Box display='flex' sx={{ mt: 3, alignItems: 'center' }}>
                <Button
                    variant='contained'
                    color='error'
                    startIcon={<ShoppingCartIcon />}
                    size='large'
                    sx={{ mr: 2 }}
                >
                    order
                </Button>
                <Typography color='red'>
                    Warranty {pc?.warranty} year{pc?.warranty > 1 && 's'}
                </Typography>
            </Box>
        </Grid>
    )
}

export default AboutPc
