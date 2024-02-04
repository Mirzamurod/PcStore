import { useTranslation } from 'react-i18next'
import { Box, Card, CircularProgress, Grid, Rating, Typography } from '@mui/material'
import { useAppSelector } from '@/store'

const Comments = () => {
  const { t } = useTranslation()

  const { mode } = useAppSelector(state => state.login)
  const { isLoading, reviews } = useAppSelector(state => state.reviews)

  return (
    <Grid container>
      <Grid item md={6}>
        {/* {isLoading && <CircularProgress color='error' sx={{ my: 4 }} />} */}
        {reviews.length > 0 &&
          reviews.map((review: any, index: number) => (
            <Grid item md={12} key={index}>
              <Card
                sx={{ mt: 4, borderRadius: 3, borderBottomLeftRadius: 0, p: '16px !important' }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '15px' }} color='error'>
                    {review?.username}
                  </Typography>
                  <Rating value={review?.rating} readOnly size='small' />
                </Box>
                <Typography sx={{ fontWeight: 400, fontSize: '15px' }}>
                  {review?.comment}
                </Typography>
                <Typography sx={{ opacity: 0.6, fontSize: 12, textAlign: 'right' }}>
                  {review?.createdAt.slice(0, 10).replace(/-/g, '/')}
                </Typography>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Grid>
  )
}

export default Comments
