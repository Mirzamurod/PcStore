import { Box, Typography } from '@mui/material'

const Title = ({ title, subtitle }: { title?: string; subtitle?: string }) => (
  <Box id='title'>
    <Typography variant='h5' fontWeight={700}>
      {title}
    </Typography>
    <Typography variant='h6' fontWeight={400}>
      {subtitle}
    </Typography>
  </Box>
)

export default Title
