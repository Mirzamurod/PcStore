import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material'
import { Pcs } from '../../../Components'
import { getPcs } from '../../../redux'

const Products = () => {
    const dispatch = useDispatch()
    const [age, setAge] = useState(10)
    const [button, setButton] = useState('All')

    const { isLoading, pcs } = useSelector(state => state.pcs)

    useEffect(() => {
        dispatch(getPcs())
    }, [dispatch])

    return (
        <Box id='pcs'>
            <Container sx={{ py: 6 }}>
                <Typography sx={{ fontWeight: 500, fontSize: '30px', mb: 3 }}>Products</Typography>
                <Grid
                    container
                    spacing={3}
                    justifyContent='space-between'
                    mb={{ xl: 7, sm: 5, xs: 0 }}
                >
                    <Grid item display='flex'>
                        {['All', 'Gaming', 'Office'].map((item, index) => (
                            <Button
                                size='large'
                                sx={{ color: item === button ? 'white' : 'gray', mr: 2 }}
                                key={index}
                                onClick={() => setButton(item)}
                            >
                                {item}
                            </Button>
                        ))}
                    </Grid>
                    <Grid item lg={'auto'}>
                        <FormControl fullWidth size='small' color='error'>
                            <InputLabel id='sort_by'>Sort by</InputLabel>
                            <Select
                                labelId='sort_by'
                                id='sort-by-select'
                                value={age}
                                autoWidth
                                label='Sort by'
                                onChange={event => setAge(event.target.value)}
                            >
                                <MenuItem value={10}>Most popular</MenuItem>
                                <MenuItem value={20}>Best Selling</MenuItem>
                                <MenuItem value={30}>Price: High to Low</MenuItem>
                                <MenuItem value={40}>Price: Low to High</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Pcs isLoading={isLoading} pcs={pcs} />
            </Container>
        </Box>
    )
}

export default Products
