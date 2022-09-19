import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { decode } from 'js-base64'
import { Container, Grid } from '@mui/material'
import { getPc } from '../../redux'
import { Loading } from '../../Components'
import Carousel from './Carousel'
import AboutPc from './AboutPc'
import Characters from './Characters'
import GeneralInfo from './GeneralInfo'

const Pc = props => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const { isLoading, pc } = useSelector(state => state.pc)

    document.title = pc.name ?? 'Pc Store'

    useEffect(() => {
        dispatch(getPc(decode(decode(id))))
    }, [dispatch, id])

    return (
        <Container sx={{ py: 4 }} id='pc'>
            {isLoading && <Loading />}
            {pc !== '' && (
                <Fragment>
                    <Grid container spacing={4}>
                        <Grid item md={6}>
                            <Carousel images={pc?.image} />
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

export default Pc
