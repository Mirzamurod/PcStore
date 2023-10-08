import { forwardRef, Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
    Box,
    Button,
    CardActions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
    Stack,
    styled,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import { Pcs as Pcs1, Title } from '../../../Components'
import { getPcs } from '../../../redux'
import AddEdit from './AddEdit'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': { padding: theme.spacing(2) },
    '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}))

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />
})

const BootstrapDialogTitle = props => {
    const { children, onClose, ...other } = props

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

const Pcs = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const descriptionElementRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    const { dark_mode } = useSelector(state => state.login)
    const { isLoading, pcs } = useSelector(state => state.pcs)

    useEffect(() => {
        dispatch(getPcs())
    }, [])

    useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef
            if (descriptionElement !== null) descriptionElement.focus()
        }
    }, [isOpen])

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
                            <AddCircleIcon fontSize='large' />
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
            <BootstrapDialog
                scroll='body'
                // keepMounted
                TransitionComponent={Transition}
                onClose={() => setIsOpen(false)}
                aria-labelledby='customized-dialog-title'
                open={isOpen}
                sx={{ '& .MuiDialog-paper': { maxWidth: '100% !important' } }}
            >
                <BootstrapDialogTitle id='customized-dialog-title' onClose={() => setIsOpen(false)}>
                    Add pc
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <AddEdit />
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='success' onClick={() => setIsOpen(false)}>
                        Save
                    </Button>
                    <Button variant='outlined' color='error' onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </Box>
    )
}

export default Pcs
