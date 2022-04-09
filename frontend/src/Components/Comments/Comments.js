import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { decode } from 'js-base64'
import { getReviews } from '../../redux/reviews/reviews'
import { Box, CircularProgress, Grid, Rating, styled, Typography } from '@mui/material'

const Comments = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { dark_mode } = useSelector(state => state.login)
    const { isLoading, reviews, isError, codeReviews } = useSelector(state => state.reviews)

    useEffect(() => {
        if (codeReviews === 0) dispatch(getReviews(decode(decode(id))))
        else dispatch(getReviews(decode(decode(id))))
    }, [dispatch, id, codeReviews])

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': { color: '#e90021' },
        '& .MuiRating-iconEmpty': { color: '#e90021' },
    })

    return (
        <Grid container>
            <Grid item md={6}>
                {isLoading && <CircularProgress color='error' sx={{ my: 4 }} />}
                {!isError &&
                    !isLoading &&
                    reviews.length > 0 &&
                    reviews.map((review, index) => (
                        <Grid
                            item
                            md={12}
                            key={index}
                            sx={{
                                mt: 4,
                                borderRadius: 3,
                                borderBottomLeftRadius: 0,
                                p: '16px !important',
                            }}
                            className={dark_mode ? 'fon dark' : 'fon light'}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography
                                    sx={{ fontWeight: 700, fontSize: '15px' }}
                                    color='error'
                                >
                                    {review?.username}
                                </Typography>
                                <StyledRating value={review?.rating} readOnly size='small' />
                            </Box>
                            <Typography sx={{ fontWeight: 400, fontSize: '15px' }}>
                                {review?.comment}
                            </Typography>
                            <Typography sx={{ opacity: 0.6, fontSize: 12, textAlign: 'right' }}>
                                {review?.createdAt.slice(0, 10).replace(/-/g, '/')}
                            </Typography>
                        </Grid>
                    ))}
                {reviews.length === 0 && isError && (
                    <Typography color='red' mt={4} variant='h5'>
                        Something went wrong!!!
                    </Typography>
                )}
            </Grid>
        </Grid>
    )
}

export default Comments
