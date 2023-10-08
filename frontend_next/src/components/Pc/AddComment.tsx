import { useState, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { decode } from 'js-base64'
import { Box, Button, Grid, Rating, styled, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import Comments from './Comments'
import { addReview } from '@/store/reviews'
import { useRouter } from 'next/router'

const Comment = memo(() => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const [rating, setRating] = useState<number>(0)
  const [comment, setComment] = useState('')

  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': { color: '#e90021' },
    '& .MuiRating-iconEmpty': { color: '#e90021' },
  })

  const send = (e: any) => {
    e.preventDefault()
    if (rating > 0 && rating < 6 && comment) {
      dispatch(addReview({ rating, comment, id: decode(decode(router.query.id as string)) }))
      setRating(0)
      setComment('')
    }
  }

  return (
    <Box>
      <Typography variant='h5' fontWeight={700}>
        {t('comment')}
      </Typography>
      <Box sx={{ py: 2 }}>
        <StyledRating
          name='comment'
          value={rating}
          size='large'
          onChange={(event, newValue) => setRating(Number(newValue))}
        />
      </Box>
      <Box>
        <Grid container>
          <Grid item md={6} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
              id='feedback'
              label={t('feedback')}
              placeholder={t('type_something')}
              multiline
              variant='standard'
              color='error'
              fullWidth
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <Button
              color='error'
              startIcon={<SendIcon />}
              variant='contained'
              sx={{ borderRadius: '500px', px: 3, height: 40, ml: 3 }}
              onClick={send}
            >
              {t('send')}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Comments />
    </Box>
  )
})

export default Comment
