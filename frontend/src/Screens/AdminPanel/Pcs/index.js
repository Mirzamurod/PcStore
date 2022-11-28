import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Box, Button, CardActions, IconButton, Modal, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Pcs as Pcs1, Title } from '../../../Components'
import { getPcs } from '../../../redux'
import AddEdit from './AddEdit'

const Pcs = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(true)

    const { dark_mode } = useSelector(state => state.login)
    const { isLoading, pcs } = useSelector(state => state.pcs)

    useEffect(() => {
        dispatch(getPcs())
    }, [dispatch])

    const buttons = () => (
        <Fragment>
            <CardActions>
                <Button fullWidth color='error' variant='contained' startIcon={<DeleteIcon />}>
                    {t('delete')}
                </Button>
            </CardActions>
            <CardActions>
                <Button fullWidth sx={{ color: 'inherit' }}>
                    {t('edit')}
                </Button>
            </CardActions>
        </Fragment>
    )

    const Pc = () => {
        return (
            <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
                <Box borderRadius='14px' className={dark_mode ? 'fon dark' : 'fon light'}>
                    <Stack>
                        <IconButton size='large' onClick={() => setIsOpen(true)}>
                            <AddCircleIcon  fontSize='large' />
                        </IconButton>
                    </Stack>
                </Box>
            </Box>
        )
    }

    return (
        <Box id='pcs'>
            <Box my={3}>
                <Title title='Pcs' />
            </Box>
            <Box sx={{ mt: 6 }}>
                <Pcs1 isLoading={isLoading} pcs={pcs} pc={<Pc />} lg={4} buttons={buttons} />
            </Box>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <AddEdit />
            </Modal>
        </Box>
    )
}

export default Pcs
