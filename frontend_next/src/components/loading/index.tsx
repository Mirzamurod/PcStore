import { Box, LinearProgress } from '@mui/material'

const Loading = ({ mt, pl }: { mt?: string | number; pl?: string | number }) => (
  <Box sx={{ width: '100%', mt, pl }}>
    <LinearProgress color='error' />
  </Box>
)

export default Loading
