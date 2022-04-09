import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
    const [showPassword, setShowPassword] = useState(false)
    const [signIn, setSignIn] = useState({ email: '', password: '', check: false })
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const { dark_mode, code } = useSelector(state => state.login)
    const token = localStorage.getItem('token')

    useEffect(() => {
        if (code === 0 && token) {
            setSignIn({ email: '', password: '', check: false })
            navigate('/')
        }
    }, [code, navigate, token])

    const signin = value => {
        value.preventDefault()
        if (signIn.email.length !== 0 && signIn.password.length !== 0) dispatch(userLogin(signIn))

        if (signIn.email.length === 0) setEmailError(true)
        else setEmailError(false)

        if (signIn.password.length === 0) setPasswordError(true)
        else setPasswordError(false)
    }

    return (
        <div id='signin'>
            <Typography variant='h6' my={5}>
                Sign In
            </Typography>
            <Box
                component='form'
                sx={{ '& .MuiInput-root': { width: '100%' } }}
                noValidate
                onSubmit={signin}
            >
                <Box border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`} borderRadius={2} p={4}>
                    <FormControl variant='standard' color='error' sx={{ display: 'block', mb: 2 }}>
                        <InputLabel htmlFor='emailin'>Email</InputLabel>
                        <Input
                            type='email'
                            id='usernamein'
                            name='username'
                            placeholder='Email'
                            value={signIn.email}
                            onChange={e => setSignIn({ ...signIn, email: e.target.value })}
                        />
                        {emailError && (
                            <FormHelperText sx={{ color: 'red', my: 1 }}>
                                Email is empty
                            </FormHelperText>
                        )}
                    </FormControl>
                    <FormControl variant='standard' color='error' sx={{ display: 'block', mb: 2 }}>
                        <InputLabel htmlFor='passwordin'>Password</InputLabel>
                        <Input
                            id='passwordin'
                            name='password'
                            placeholder='Password'
                            type={showPassword ? 'text' : 'password'}
                            value={signIn.password}
                            onChange={e => setSignIn({ ...signIn, password: e.target.value })}
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
                        {passwordError && (
                            <FormHelperText sx={{ color: 'red', my: 1 }}>
                                Password is empty
                            </FormHelperText>
                        )}
                    </FormControl>
                </Box>
                <FormControlLabel
                    control={<Checkbox color='error' />}
                    label='Remember my details'
                    sx={{ display: 'block', my: 2 }}
                    checked={signIn.check}
                    onChange={e => setSignIn({ ...signIn, check: e.target.checked })}
                />
                <Button
                    color='error'
                    variant='contained'
                    endIcon={<ArrowRightAltIcon />}
                    sx={{ width: '100%' }}
                    onClick={signin}
                    size='large'
                    type='submit'
                >
                    sign in
                </Button>
                <Box mb={6} my={3}>
                    <Link to='/' className={`link ${!dark_mode && 'light'}`}>
                        Forgot password?
                    </Link>
                </Box>
            </Box>
        </div>
    )
}

export default SignIn
