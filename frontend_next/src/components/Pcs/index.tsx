import { Fragment } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { Card, CardContent, Typography, Grid, Link as RouterLink } from '@mui/material'
import { encode } from 'js-base64'
import Loading from '@/components/Loading'
import ImageCarouselCard from '@/components/ImageCarouselCard'
import { IPc } from '@/types/pc'

interface Props {
  isLoading: boolean
  pcs: IPc[]
  pc?: any
  buttons: Function
  lg?: number
  md?: number
}

const Pcs = ({ isLoading, pcs, pc, buttons, lg, md }: Props) => {
  const { t } = useTranslation()

  return (
    <Grid container spacing={{ xl: 8, lg: 6, md: 4, sm: 2, xs: 0 }}>
      {isLoading && <Loading mt={5} pl={6} />}
      {!isLoading && pc && (
        <Grid item pt={{ sm: '16px !important' }} lg={lg ?? 3} md={md ?? 4} sm={6} xs={12}>
          {pc}
        </Grid>
      )}
      {!isLoading &&
        pcs?.length > 0 &&
        pcs?.map((item: IPc, ind) => (
          <Grid
            item
            pt={{ sm: '16px !important' }}
            lg={lg ?? 3}
            md={md ?? 4}
            sm={6}
            xs={12}
            key={ind}
          >
            <Card
              sx={{
                boxShadow: 0,
                backgroundImage: 'linear-gradient(rgb(255 255 255 / 0%), rgb(255 255 255 / 0%))',
              }}
            >
              {item?.stock_price > 0 && (
                <Fragment>
                  <img
                    src='/assets/images/stock.png'
                    style={{ width: '70px', position: 'absolute' }}
                    alt='rasm'
                  />
                  <p
                    className={classNames('stock', item?.stock_price > 10 ? 'left-78' : 'left-88')}
                  >
                    10%
                  </p>
                </Fragment>
              )}
              <ImageCarouselCard images={item?.image} />
              <CardContent>
                <Typography gutterBottom variant='subtitle1' component='div' fontWeight={700}>
                  <RouterLink
                    href={`/pc/${encode(encode(item?._id))}`}
                    component={Link}
                    color='inherit'
                    sx={{ textDecoration: 'none' }}
                  >
                    {item?.name}
                  </RouterLink>
                </Typography>
                <Typography
                  variant='body2'
                  gutterBottom
                  textTransform='uppercase'
                  sx={{ opacity: '.7' }}
                >
                  {item?.cpu} {item?.ddr} {item?.videocard}
                  <br />
                  {item?.hdd} {item?.ssd_sata} {item?.ssd_m2}
                </Typography>
                <Typography variant='body1' gutterBottom sx={{ opacity: '.7' }}>
                  {t('warranty')} {item?.warranty} {t('year')}
                  {Number(item?.warranty) > 1 && t('s')}
                </Typography>
                {item?.stock_price > 0 && (
                  <Typography variant='h6' component='del' sx={{ opacity: '.7' }}>
                    {item?.stock_price.toLocaleString()} UZS
                  </Typography>
                )}
                <Typography variant='h5' sx={{ fontWeight: 700 }} color='error'>
                  {item?.price.toLocaleString()} UZS
                </Typography>
              </CardContent>
              {buttons(item)}
            </Card>
          </Grid>
        ))}
    </Grid>
  )
}

export default Pcs
