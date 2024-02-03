import { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import classNames from 'classnames'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { encode } from 'js-base64'
import {
  Box,
  Button,
  CardActions,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { useAppSelector } from '@/store'
import Pcs from '@/components/pcs'
import { getPcs } from '@/store/pcs/pcs'

const Products = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [sort, setSort] = useState('most_popular')
  const [button, setButton] = useState('all')

  const { isLoading, pcs } = useAppSelector(state => state.pcs)

  useEffect(() => {
    dispatch(getPcs())
  }, [])

  const buttons = (item: any) => (
    <Fragment>
      <CardActions>
        <Button fullWidth variant='contained' startIcon={<ShoppingCartIcon />}>
          {t('order')}
        </Button>
      </CardActions>
      <CardActions>
        <Button
          component={Link}
          fullWidth
          endIcon={<ArrowForwardIosIcon />}
          color='inherit'
          href={`/pc/${encode(encode(item?._id))}`}
        >
          {t('details')}
        </Button>
      </CardActions>
    </Fragment>
  )

  return (
    <Box id='pcs'>
      <Container sx={{ py: 6 }}>
        <Typography sx={{ fontWeight: 500, fontSize: '30px', mb: 3 }}>{t('products')}</Typography>
        <Grid container spacing={3} justifyContent='space-between' mb={{ xl: 7, sm: 5, xs: 0 }}>
          <Grid item display='flex'>
            {['all', 'gaming', 'office'].map((item, index) => (
              <Button
                color='inherit'
                size='large'
                sx={{ color: classNames({ gray: item !== button }), mr: 2 }}
                key={index}
                onClick={() => setButton(item)}
              >
                {t(item)}
              </Button>
            ))}
          </Grid>
          <Grid item lg={'auto'}>
            <FormControl fullWidth size='small' color='error'>
              <InputLabel id='sort_by'>{t('sort_by')}</InputLabel>
              <Select
                labelId='sort_by'
                id='sort-by-select'
                value={sort}
                color='error'
                autoWidth
                label={t('sort_by')}
                onChange={event => setSort(event.target.value)}
              >
                {['most_popular', 'price_h_to_l', 'price_l_to_h'].map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {t(item)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Pcs isLoading={isLoading} pcs={pcs} buttons={buttons} />
      </Container>
    </Box>
  )
}

export default Products
