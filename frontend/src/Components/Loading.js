import { Box, LinearProgress } from '@mui/material'

export const Loading = ({ mt }) => (
    <Box sx={{ width: '100%', mt }}>
        <LinearProgress color='error' />
    </Box>
)
