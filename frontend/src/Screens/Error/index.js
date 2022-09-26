import { useTranslation } from 'react-i18next'
import { Container, Typography } from '@mui/material'

const Error = () => {
    const { t } = useTranslation()

    return (
        <Container>
            <Typography variant='h3' color='red' fontWeight={700} mb={4}>
                {t('not_found')}
            </Typography>
        </Container>
    )
}

export default Error
