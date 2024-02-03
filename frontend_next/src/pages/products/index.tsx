import Sidebar from '@/components/products/Sidebar'
import { Container, Grid } from '@mui/material'

const Products = () => {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item md={3}>
          <Sidebar />
        </Grid>
        <Grid item md={9}></Grid>
      </Grid>
    </Container>
  )
}

Products.guestGuard = true

export default Products
