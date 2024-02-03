import { Fragment, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Container, Grid } from '@mui/material'
import { useAppSelector } from '@/store'
import Loading from '@/components/loading'
import { getPc } from '@/store/pcs/pc'
import Carousel from '@/components/pc/Carousel'
import AboutPc from '@/components/pc/AboutPc'
import Characters from '@/components/pc/Characters'
import GeneralInfo from '@/components/pc/GeneralInfo'
import { getReviews } from '@/store/reviews'
import { decode } from 'js-base64'

const Pc = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { isLoading, pc } = useAppSelector(state => state.pc)
  const { success } = useAppSelector(state => state.reviews)

  document.title = pc?.name || 'Pc Store'

  useEffect(() => {
    if (router.query.id) {
      dispatch(getPc(decode(router.query.id as string)))
      dispatch(getReviews(decode(router.query.id as string)))
    }
  }, [router.query.id])

  useEffect(() => {
    if (success) dispatch(getReviews(decode(router.query.id as string)))
  }, [success])

  return (
    <Container sx={{ py: 4 }} id='pc'>
      {isLoading && <Loading />}
      {pc && (
        <Fragment>
          <Grid container spacing={4}>
            <Grid item md={6}>
              <Carousel images={pc.image as string[]} />
            </Grid>
            <AboutPc />
          </Grid>
          <Characters />
        </Fragment>
      )}
      <GeneralInfo />
    </Container>
  )
}

Pc.guestGuard = true

export default Pc
