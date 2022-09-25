import { t } from 'i18next'
import { Container, Typography } from '@mui/material'

const index = () => (
    <Container>
        <Typography variant='h3' color='red' fontWeight={700} mb={4}>
            {t('not_found')}
        </Typography>
    </Container>
)

export default index
