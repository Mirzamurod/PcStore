import { useState, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { decode } from 'js-base64'
import { Box, Button, Grid, Rating, styled, TextField, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { addReview } from '../../redux/reviews/reviews'
import Comments from '../Comments/Comments'

const Comment = memo(() => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': { color: '#e90021' },
        '& .MuiRating-iconEmpty': { color: '#e90021' },
    })

    const send = e => {
        e.preventDefault()
        if (rating > 0 && rating < 6 && comment) {
            dispatch(addReview({ rating, comment, id: decode(decode(id)) }))
            setRating(0)
            setComment('')
        }
    }

    return (
        <Box>
            <Typography variant='h5' fontWeight={700}>
                Comment
            </Typography>
            <Box sx={{ py: 2 }}>
                <StyledRating
                    name='comment'
                    value={rating}
                    size='large'
                    onChange={(event, newValue) => setRating(newValue)}
                />
            </Box>
            <Box>
                <Grid container>
                    <Grid item md={6} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField
                            id='feedback'
                            label='Feedback'
                            placeholder='Type something...'
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
                            send
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Comments />
        </Box>
    )
})

export default Comment
