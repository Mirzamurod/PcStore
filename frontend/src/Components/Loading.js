import { Box, LinearProgress } from '@mui/material'

const Loading = ({ mt }) => (
    <Box sx={{ width: '100%', mt }}>
        <LinearProgress color='error' />
    </Box>
)

export default Loading
