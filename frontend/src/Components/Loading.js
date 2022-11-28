import { Box, LinearProgress } from '@mui/material'

const Loading = ({ mt, pl }) => (
    <Box sx={{ width: '100%', mt, pl }}>
        <LinearProgress color='error' />
    </Box>
)

export default Loading
