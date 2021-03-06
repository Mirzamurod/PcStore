import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
    Typography,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { userLogin } from '../../redux/user/login'
import './signin.scss'

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        setValue,
    } = useForm()
    const [showPassword, setShowPassword] = useState(false)

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
                Sign In
            </Typography>
            <Box
                component='form'
                sx={{ '& .MuiInput-root': { width: '100%' } }}
                noValidate
                onSubmit={handleSubmit(value => dispatch(userLogin(value)))}
            >
                <Box border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`} borderRadius={2} p={4}>
                    <TextField
                        label='Email'
                        error={!!errors?.email}
                        variant='standard'
                        color='error'
                        sx={{ display: 'block', mb: 2 }}
                        type='email'
                        placeholder='example@gmail.com'
                        {...register('email', {
                            required: 'This field is required!!!',
                            pattern: {
                                value: /[\w.]+@\w+\.(com|ru)/,
                                message: 'This is not Email',
                            },
                        })}
                        helperText={errors?.email?.message}
                    />
                    <FormControl
                        variant='standard'
                        error={!!errors?.password}
                        color='error'
                        sx={{ display: 'block', mb: 2 }}
                    >
                        <InputLabel htmlFor='passwordin'>Password</InputLabel>
                        <Input
                            placeholder='Password'
                            type={showPassword ? 'text' : 'password'}
                            {...register('password', {
                                required: 'This field is required!!!',
                                minLength: { value: 8, message: 'Minimum 8 letters' },
                            })}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={() => setShowPassword(!showPassword)}
                                        onMouseDown={e => e.preventDefault()}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormHelperText>{errors?.password?.message}</FormHelperText>
                    </FormControl>
                </Box>
                <FormControlLabel
                    control={<Checkbox color='error' />}
                    label='Remember my details'
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
                    sign in
                </Button>
            </Box>
            <Box mb={6} my={3}>
                <Link to='/' className={`link ${!dark_mode && 'light'}`}>
                    Forgot password?
                </Link>
            </Box>
        </div>
    )
}

export default SignIn
