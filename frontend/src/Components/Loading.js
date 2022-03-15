import { Box, LinearProgress } from '@mui/material'

export const Loading = () => (
    <Box sx={{ width: '100%' }}>
        <LinearProgress color='error' />
    </Box>
)
