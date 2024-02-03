import { Box, SxProps, Typography } from '@mui/material'

const Title = ({ title, subtitle, sx }: { title?: string; subtitle?: string, sx?: SxProps }) => (
  <Box id='title' sx={sx}>
    <Typography variant='h5' fontWeight={700}>
      {title}
    </Typography>
    <Typography variant='h6' fontWeight={400}>
      {subtitle}
    </Typography>
  </Box>
)

export default Title
