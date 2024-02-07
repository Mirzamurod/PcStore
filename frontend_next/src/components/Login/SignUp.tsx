import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'
import { Box, Checkbox, FormControlLabel, TextFieldProps, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import InputOptions from '@/components/inputOptions'
import PasswordInputOptions from '@/components/passwordInputOptions'
import { useAppSelector } from '@/store'
import { addUser } from '@/store/user/register'
import { IInput, TInputType, TPasswordInputType } from '@/types/inputs'

const SignUp = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('username_required'))
      .matches(/[A-Za-z0-9]/g, t('not_username')),
    fullname: Yup.string()
      .required(t('fullname_required'))
      .matches(/[A-z]+\s[A-z]+/, t('not_fullname'))
      .trim(),
    email: Yup.string().required(t('email_required')).email(t('not_email')),
    password: Yup.string()
      .required(t('password_required'))
      .min(8, t('minimum_8_letters'))
      .max(16, t('maximum_16_letters'))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/, t('must')),
    cpassword: Yup.string()
      .required(t('confirm_password_required'))
      .min(8, t('minimum_8_letters'))
      .max(16, t('maximum_16_letters'))
      .oneOf([Yup.ref('password')], t('not_same_confirm_password')),
    remember: Yup.bool(),
  })
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    clearErrors,
    setError,
  } = useForm({ mode: 'onTouched', resolver: yupResolver(formSchema) })

  const { mode } = useAppSelector(state => state.login)
  const { code, isLoading, err_msg } = useAppSelector(state => state.register)

  useEffect(() => {
    if (code === 0) {
      toast.success("Endi Loginni to'ldirib, ishizi davom ettirin!", {
        theme: mode === 'dark' ? 'light' : 'dark',
      })
      reset()
      clearErrors()
    }
  }, [code, mode, reset, clearErrors])

  useEffect(() => {
    if (Object.keys(err_msg).length > 0)
      Object.keys(err_msg).map((key: any) =>
        setError(key, { type: 'value', message: err_msg[key] })
      )
  }, [err_msg, setError])

  const signup = (values: any) => {
    dispatch(
      addUser({
        ...values,
        username: values.username.toLowerCase(),
        fullname: values.fullname.replace(
          /[A-z]+/g,
          (soz: string) => soz.charAt(0).toUpperCase() + soz.slice(1)
        ),
      })
    )
  }

  const optionsInput: TInputType[] = [
    { name: 'username', isLoading, fullWidth: true },
    { name: 'fullname', placeholder: 'John Doe', isLoading, fullWidth: true },
    { name: 'email', type: 'email', isLoading, fullWidth: true },
  ]

  const optionsPassword: TPasswordInputType[] = [
    { name: 'password', label: 'create_password', isLoading, fullWidth: true },
    { name: 'cpassword', label: 'confirm_password', isLoading, fullWidth: true },
  ]

  return (
    <div id='signup'>
      <Typography variant='h6' my={5}>
        {t('create_account')}
      </Typography>
      <Box component='form' noValidate onSubmit={handleSubmit(signup)}>
        <Box border={`1px solid ${mode === 'dark' ? '#e2e4e5' : 'gray'}`} borderRadius={2} p={4}>
          <InputOptions options={optionsInput} register={register} errors={errors} />
          <PasswordInputOptions options={optionsPassword} register={register} errors={errors} />
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
