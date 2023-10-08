import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { decode } from 'js-base64'
import { Container, Grid } from '@mui/material'
import { RootState } from '@/store'
import Loading from '@/components/Loading'
import { getPc } from '@/store/pcs/pc'
import Carousel from '@/components/Pc/Carousel'
import AboutPc from '@/components/Pc/AboutPc'
import Characters from '@/components/Pc/Characters'
import GeneralInfo from '@/components/Pc/GeneralInfo'
import { getReviews } from '@/store/reviews'

const Pc = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { isLoading, pc } = useSelector((state: RootState) => state.pc)
  const { codeReviews } = useSelector((state: RootState) => state.reviews)

  document.title = pc?.name || 'Pc Store'

  useEffect(() => {
    if (router?.query?.id) {
      dispatch(getPc(decode(decode(router?.query?.id as string))))
      dispatch(getReviews(decode(decode(router?.query?.id as string))))
    }
  }, [router?.query?.id])

  useEffect(() => {
    if ((codeReviews as number) === 0)
      dispatch(getReviews(decode(decode(router?.query?.id as string))))
  }, [codeReviews])

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
