import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { t } from 'i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Typography,
    TextField,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { addUser } from '../../../redux'

import 'react-toastify/dist/ReactToastify.css'

const SignUp = () => {
    const dispatch = useDispatch()
    const formSchema = Yup.object().shape({
        username: Yup.string()
            .required(t('username_required'))
            .matches(/[A-Za-z0-9]/g),
        fullname: Yup.string()
            .required(t('full_name_required'))
            .matches(/[A-z]+\s[A-z]+/, t('not_full_name'))
            .trim(),
        email: Yup.string()
            .required(t('email_required'))
            .matches(/[\w.]+@\w+\.(com|ru)/, t('This is not Email')),
        password: Yup.string().required(t('Password is required!')).min(8, t('minimum_8_letters')),
        cpassword: Yup.string()
            .required(t('confirm_password_required'))
            .min(8, t('minimum_8_letters'))
            .oneOf([Yup.ref('password')], t('not_same_confirm_password')),
    })
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        clearErrors,
        setError,
    } = useForm({ mode: 'onTouched', resolver: yupResolver(formSchema) })
    const [cPasswordI, setCPasswordI] = useState(false)
    const [rPasswordI, setRPasswordI] = useState(false)

    const { dark_mode } = useSelector(state => state.login)
    const { code, isLoading, err_msg } = useSelector(state => state.register)

    useEffect(() => {
        if (code === 0) {
            toast.success("Endi Loginni to'ldirib, ishizi davom ettirin!", {
                theme: dark_mode ? 'light' : 'dark',
            })
            reset()
            clearErrors()
        }
    }, [code, dark_mode, reset, clearErrors])

    useEffect(() => {
        if (Object.keys(err_msg).length > 0)
            Object.keys(err_msg).map(key => setError(key, { type: 'value', message: err_msg[key] }))
    }, [err_msg, setError])

    const signup = values => {
        dispatch(
            addUser({
                ...values,
                username: values.username.toLowerCase(),
                fullname: values.fullname.replace(
                    /[A-z]+/g,
                    soz => soz.charAt(0).toUpperCase() + soz.slice(1)
                ),
            })
        )
    }

    return (
        <div id='signup'>
            <Typography variant='h6' my={5}>
                {t('create_account')}
            </Typography>
            <Box
                component='form'
                sx={{ '& .MuiInput-root': { width: '100%' } }}
                noValidate
                onSubmit={handleSubmit(signup)}
            >
                <Box border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`} borderRadius={2} p={4}>
                    {/* Username */}
                    <TextField
                        label={t('username')}
                        error={!!errors?.username}
                        variant='standard'
                        color='error'
                        sx={{ display: 'block', mb: 2 }}
                        type='email'
                        placeholder='username'
                        disabled={isLoading}
                        {...register('username')}
                        helperText={errors?.username?.message}
                    />
                    {/* Full Name */}
                    <TextField
                        label={t('full_name')}
                        error={!!errors?.fullname}
                        variant='standard'
                        color='error'
                        sx={{ display: 'block', mb: 2 }}
                        type='email'
                        placeholder='John Doe'
                        disabled={isLoading}
                        {...register('fullname')}
                        helperText={errors?.fullname?.message}
                    />
                    {/* Email */}
                    <TextField
                        label={t('email')}
                        error={!!errors?.email}
                        variant='standard'
                        color='error'
                        sx={{ display: 'block', mb: 2 }}
                        type='email'
                        placeholder='example@gmail.com'
                        disabled={isLoading}
                        {...register('email')}
                        helperText={errors?.email?.message}
                    />
                    {/* Create Password */}
                    <FormControl
                        variant='standard'
                        color='error'
                        error={!!errors?.password}
                        sx={{ display: 'block', mb: 2 }}
                    >
                        <InputLabel htmlFor='passwordup'>{t('create_password')}</InputLabel>
                        <Input
                            placeholder={t('create_password')}
                            type={cPasswordI ? 'text' : 'password'}
                            {...register('password')}
                            disabled={isLoading}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='password'
                                        onClick={() => setCPasswordI(!cPasswordI)}
                                        onMouseDown={e => e.preventDefault()}
                                        disabled={isLoading}
                                    >
                                        {cPasswordI ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>{errors?.password?.message}</FormHelperText>
                    </FormControl>
                    {/* Confirm Password */}
                    <FormControl
                        variant='standard'
                        color='error'
                        error={!!errors?.cpassword}
                        sx={{ display: 'block', mb: 2 }}
                    >
                        <InputLabel>{t('confirm_password')}</InputLabel>
                        <Input
                            placeholder={t('confirm_password')}
                            type={rPasswordI ? 'text' : 'password'}
                            {...register('cpassword')}
                            disabled={isLoading}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='cpassword'
                                        onClick={() => setRPasswordI(!rPasswordI)}
                                        onMouseDown={e => e.preventDefault()}
                                        disabled={isLoading}
                                    >
                                        {rPasswordI ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>{errors?.cpassword?.message}</FormHelperText>
                    </FormControl>
                </Box>
                <FormControlLabel
                    control={<Checkbox color='error' />}
                    label={t('remember_my_details')}
                    sx={{ display: 'block', my: 2 }}
                    {...register('remember')}
                    disabled={isLoading}
                />
                <LoadingButton
                    color='error'
                    variant='contained'
                    sx={{ width: '100%' }}
                    type='submit'
                    size='large'
                    loading={isLoading}
                >
                    {t('create_account')}
                </LoadingButton>
            </Box>
            <ToastContainer style={{ width: '100%' }} />
        </div>
    )
}

export default SignUp
