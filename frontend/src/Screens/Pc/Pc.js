import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { decode } from 'js-base64'
import { getPc } from './../../redux/pcs/pc'
import { Container, Grid } from '@mui/material'
import { Loading } from './../../Components/Loading'
import PcImages from './../../Components/PcImages'
import AboutPc from './../../Components/AboutPc/AboutPc'
import Characters from './../../Components/Characters/Characters'
import GeneralInfo from './../../Components/GeneralInfo/GeneralInfo'

const Pc = () => {
    const dispatch = useDispatch()
    const { id } = useParams()

    const { isLoading, pc } = useSelector(state => state.pc)

    useEffect(() => {
        dispatch(getPc(decode(decode(id))))
    }, [dispatch, id])

    return (
        <Container sx={{ py: 4 }} id='pc'>
            {isLoading && <Loading />}
            {pc !== '' && (
                <>
                    <Grid container spacing={4}>
                        <Grid item md={6}>
                            <PcImages images={pc?.image} />
                        </Grid>
                        <AboutPc />
                    </Grid>
                    <Characters />
                </>
            )}
            <GeneralInfo />
        </Container>
    )
}

export default Pc
