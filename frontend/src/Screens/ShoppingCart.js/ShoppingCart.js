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

const ShoppingCart = () => {
    return (
        <Container sx={{ pb: 4 }}>
            <Typography variant='h6' mb={4} fontWeight={700}>
                Shopping Cart
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ color: '#686868' }}>
                        <TableRow>
                            <TableCell>ITEM DESCRIPTION</TableCell>
                            <TableCell>QUANTITY</TableCell>
                            <TableCell>UNIT PRICE</TableCell>
                            <TableCell>SUB TOTAL</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default ShoppingCart
