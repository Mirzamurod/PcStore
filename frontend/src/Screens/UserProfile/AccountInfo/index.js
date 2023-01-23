import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { Box, Button, Grid, TextField } from '@mui/material'
import {
    Title,
    CardBox,
    PasswordInput,
    PasswordInputOptions,
    InputOptions,
} from '../../../Components'
import { userProfile, userUpdate } from '../../../redux'

const AccountInfo = memo(() => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/
    const formSchema = Yup.object().shape({
        username: Yup.string()
            .required(t('username_required'))
            .matches(/[A-Za-z0-9]+/g, t('not_username'))
            .trim(),
        fullname: Yup.string()
            .required(t('fullname_required'))
            .matches(/[A-z]+\s[A-z]+/, t('not_fullname'))
            .trim(),
        email: Yup.string().required(t('email_required')).email(t('not_email')).trim(),
        currentPassword: Yup.string()
            .required(show && t('current_password_required'))
            .min(8, t('minimum_8_letters'))
            .max(16, t('maximum_16_letters'))
            .matches(regex, t('must')),
        newPassword: Yup.string()
            .required(show && t('new_password_required'))
            .min(8, t('minimum_8_letters'))
            .max(16, t('maximum_16_letters'))
            .matches(regex, t('must')),
        confirmNewPassword: Yup.string()
            .required(show && t('confirm_new_password_required'))
            .min(8, t('minimum_8_letters'))
            .max(16, t('maximum_16_letters'))
            .oneOf([Yup.ref('newPassword')], t('not_same_confirm_password')),
    })
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
        clearErrors,
        setError,
        setValue,
        watch,
    } = useForm({ mode: 'onTouched', resolver: yupResolver(formSchema) })
    const [save, setSave] = useState(true)

    const { dark_mode, user, code, isLoading } = useSelector(state => state.login)

    // get User
    useEffect(() => {
        if (code === 0) dispatch(userProfile())
    }, [code, dispatch, user])

    // fill in the input with user info
    useEffect(() => {
        if (user || code === 0) {
            setValue('username', user.username)
            setValue('fullname', user.fullname)
            setValue('email', user.email)
        }
    }, [user, code, setValue])

    // save change button
    useEffect(() => {
        if (
            user &&
            (watch('username') !== user.username ||
                watch('fullname') !== user.fullname ||
                watch('email') !== user.email ||
                watch('currentPassword') ||
                watch('newPassword') ||
                watch('confirmNewPassword'))
        ) {
            setSave(false)
        }
    }, [watch, user])

    const saveChanges = values => {
        console.log(values)
    }

    const optionsInput = [{ name: 'username' }, { name: 'fullname' }, { name: 'email' }]

    const optionsPassword = [
        { name: 'currentPassword' },
        { name: 'newPassword' },
        { name: 'confirmNewPassword' },
    ]

    return (
        <Box
            id='accountInfo'
            component='form'
            // noValidate
            onSubmit={handleSubmit(saveChanges)}
            autoComplete='true'
        >
            <Box my={3}>
                <Title title={t('user_info')} />
            </Box>
            <CardBox>
                <Grid container spacing={4}>
                    <Grid item md={6}>
                        <Box
                            border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`}
                            borderRadius={2}
                            p={4}
                        >
                            <InputOptions
                                options={optionsInput}
                                register={register}
                                errors={errors}
                                isLoading={isLoading}
                            />
                        </Box>
                    </Grid>
                    <Grid item md={6} display={show ? 'unset' : 'none'}>
                        <Box
                            border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`}
                            borderRadius={2}
                            p={4}
                        >
                            <PasswordInputOptions
                                options={optionsPassword}
                                register={register}
                                errors={errors}
                            />
                        </Box>
                    </Grid>
                </Grid>
                <Button
                    size='large'
                    color='error'
                    onClick={() => setShow(!show)}
                    sx={{ textTransform: 'capitalize', mt: 4 }}
                >
                    {t('change_password')}
                </Button>
            </CardBox>
            <Button
                variant='contained'
                color='error'
                size='large'
                sx={{ textTransform: 'capitalize', my: 4 }}
                disabled={save}
                type='submit'
            >
                {t('save_changes')}
            </Button>
        </Box>
    )
})

export default AccountInfo
