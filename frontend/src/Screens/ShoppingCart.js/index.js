import { t } from 'i18next'
import {
    Container,
    Paper,
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'

document.title = 'Shopping Cart'

const ShoppingCart = () => {
    return (
        <Container sx={{ pb: 4 }}>
            <Typography variant='h6' mb={4} fontWeight={700}>
                {t('shopping_cart')}
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ color: '#686868' }}>
                        <TableRow>
                            <TableCell>{t('item_desc')}</TableCell>
                            <TableCell>{t('quantity')}</TableCell>
                            <TableCell>{t('unit_price')}</TableCell>
                            <TableCell>{t('sub_total')}</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default ShoppingCart
