import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import classNames from 'classnames'
import { Box, Button, Checkbox, FormControlLabel, Typography } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { userLogin } from '../../../redux'
import { InputOptions, PasswordInputOptions } from '../../../Components'

import './signin.scss'

const SignIn = () => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formSchema = Yup.object().shape({
        email: Yup.string().required(t('email_required')).email(t('not_email')),
        password: Yup.string()
            .required(t('password_required'))
            .min(8, t('minimum_8_letters'))
            .max(16, t('maximum_16_letters'))
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, t('must')),
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm({ mode: 'onTouched', resolver: yupResolver(formSchema) })

    const { dark_mode, code, err_msg } = useSelector(state => state.login)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (code === 0 && token) {
            setValue('email', '')
            setValue('password', '')
            navigate('/')
        }
    }, [code, navigate, token, setValue])

    useEffect(() => {
        if (Object.keys(err_msg).length > 0)
            Object.keys(err_msg).map(key => setError(key, { type: 'value', message: err_msg[key] }))
    }, [err_msg, setError])

    return (
        <div id='signin'>
            <Typography variant='h6' my={5}>
                {t('sign_in')}
            </Typography>
            <Box
                component='form'
                sx={{ '& .MuiInput-root': { width: '100%' } }}
                noValidate
                onSubmit={handleSubmit(value => dispatch(userLogin(value)))}
            >
                <Box border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`} borderRadius={2} p={4}>
                    <InputOptions
                        options={[{ name: 'email', placeholder: 'example@gmail.com' }]}
                        register={register}
                        errors={errors}
                    />
                    <PasswordInputOptions
                        options={[{ name: 'password' }]}
                        register={register}
                        errors={errors}
                    />
                </Box>
                <FormControlLabel
                    control={<Checkbox color='error' />}
                    label={t('remember_my_details')}
                    sx={{ display: 'block', my: 2 }}
                    {...register('check')}
                />
                <Button
                    color='error'
                    variant='contained'
                    endIcon={<ArrowRightAltIcon />}
                    sx={{ width: '100%' }}
                    size='large'
                    type='submit'
                >
                    {t('sign_in')}
                </Button>
            </Box>
            <Box mb={6} my={3}>
                <Link to='/' className={classNames('link', { light: !dark_mode })}>
                    {t('forgot_password')}
                </Link>
            </Box>
        </div>
    )
}

export default SignIn
