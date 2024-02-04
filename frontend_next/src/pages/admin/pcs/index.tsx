import { forwardRef, Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
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
  SlideProps,
  Stack,
  styled,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import AddEdit from '@/components/addEdit'
import AdminSidebar from '@/components/adminSidebar'
import { useAppSelector } from '@/store'
import { getPcs } from '@/store/pcs/pcs'
import Title from '@/components/title'
import Pcs from '@/components/pcs'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': { padding: theme.spacing(2) },
  '& .MuiDialogActions-root': { padding: theme.spacing(1) },
}))

const Transition = forwardRef(function Transition(props: SlideProps, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const BootstrapDialogTitle = (props: any) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: theme => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

const AdminPcs = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const descriptionElementRef = useRef<HTMLElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { mode } = useAppSelector(state => state.login)
  const { isLoading, pcs } = useAppSelector(state => state.pcs)

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
        <Button fullWidth variant='contained' startIcon={<DeleteIcon />}>
          {t('delete')}
        </Button>
      </CardActions>
      <CardActions>
        <Button fullWidth color='inherit' startIcon={<EditIcon />}>
          {t('edit')}
        </Button>
      </CardActions>
    </Fragment>
  )

  const Pc = () => {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' height='100%'>
        <Box borderRadius='14px' className={mode === 'dark' ? 'fon dark' : 'fon light'}>
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
    <AdminSidebar>
      <Box id='pcs'>
        <Box my={3}>
          <Title title='Pcs' />
        </Box>
        <Box sx={{ mt: 6 }}>
          <Pcs isLoading={isLoading} pcs={pcs} pc={<Pc />} lg={4} buttons={buttons} />
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
    </AdminSidebar>
  )
}

export default AdminPcs
