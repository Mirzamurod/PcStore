import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, CircularProgress, Grid, Rating, styled, Typography } from '@mui/material'
import { RootState } from '@/store'

const Comments = () => {
  const { t } = useTranslation()

  const { dark_mode } = useSelector((state: RootState) => state.login)
  const { isLoading, reviews, isError } = useSelector((state: RootState) => state.reviews)

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
          reviews.map((review: any, index: number) => (
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
                <Typography sx={{ fontWeight: 700, fontSize: '15px' }} color='error'>
                  {review?.username}
                </Typography>
                <StyledRating value={review?.rating} readOnly size='small' />
              </Box>
              <Typography sx={{ fontWeight: 400, fontSize: '15px' }}>{review?.comment}</Typography>
              <Typography sx={{ opacity: 0.6, fontSize: 12, textAlign: 'right' }}>
                {review?.createdAt.slice(0, 10).replace(/-/g, '/')}
              </Typography>
            </Grid>
          ))}
        {reviews.length === 0 && isError && (
          <Typography color='red' mt={4} variant='h5'>
            {t('wrong')}
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default Comments
