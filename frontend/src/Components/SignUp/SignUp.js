import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
    Snackbar,
    Alert,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import { addUser } from '../../redux/user/register'

const SignUp = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [cPasswordI, setCPasswordI] = useState(false)
    const [rPasswordI, setRPasswordI] = useState(false)
    const [equal, setEqual] = useState(false)
    const [signUp, setSignUp] = useState({
        username: '',
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
        check: false,
    })
    const [usernameC, setUsernameC] = useState(false) // check
    const [fullnameC, setFullnameC] = useState(false)
    const [emailC, setEmailC] = useState(false)
    const [passwordC, setPasswordC] = useState(false)
    const [usernameError, setUsernameError] = useState(false)
    const [fullnameError, setFullnameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [cPasswordError, setCPasswordError] = useState(false)
    const [rPasswordError, setRPasswordError] = useState(false)
    const [loading, setLoading] = useState(false)

    const { dark_mode } = useSelector(state => state.login)
    const { status } = useSelector(state => state.register)

    useEffect(() => {
        if (status === 201 || status === 200) {
            setOpen(true)
            setLoading(false)
            setSignUp({
                username: '',
                fullname: '',
                email: '',
                password: '',
                confirmPassword: '',
                check: false,
            })
        }
    }, [status])

    const signup = () => {
        const symbol = /\W/g
        const fullnameCheck = /[A-z]+\s[A-z]+/
        const emailCheck = /[\w.]+@\w+\.(com|ru)/

        ;[
            { name: signUp.username.length === 0, change: setUsernameError },
            { name: symbol.test(signUp.username), change: setUsernameC },
            { name: signUp.fullname.length === 0, change: setFullnameError },
            {
                name:
                    !fullnameCheck.test(signUp.fullname) ||
                    signUp.fullname.match(/\s/g).length !== 1 ||
                    signUp.fullname.match(symbol).length !== 1 ||
                    /[0-9]/.test(signUp.fullname),
                change: setFullnameC,
            },
            { name: signUp.email.length === 0, change: setEmailError },
            { name: !emailCheck.test(signUp.email), change: setEmailC },
            { name: signUp.password.length === 0, change: setCPasswordError },
            {
                name:
                    signUp.password.length !== 0 &&
                    (!/\W/.test(signUp.password) ||
                        !/[A-Z]/.test(signUp.password) ||
                        !/[a-z]/.test(signUp.password) ||
                        !/[0-9]/.test(signUp.password)),
                change: setPasswordC,
            },
            { name: signUp.confirmPassword.length === 0, change: setRPasswordError },
            { name: signUp.password !== signUp.confirmPassword, change: setEqual },
        ].forEach(check => {
            if (check.name) check.change(true)
            else check.change(false)
        })

        if (
            signUp.username.length !== 0 && // true
            !symbol.test(signUp.username) && // true
            signUp.fullname.length !== 0 && // true
            fullnameCheck.test(signUp.fullname) && // true
            signUp.fullname.match(/\s/g).length === 1 && // true
            signUp.fullname.match(symbol).length === 1 && // true
            !/[0-9]/.test(signUp.fullname) && // true
            signUp.email.length !== 0 && // true
            emailCheck.test(signUp.email) && // true
            signUp.password.length !== 0 && // true
            /\W/.test(signUp.password) && // true
            /[A-Z]/.test(signUp.password) && // true
            /[a-z]/.test(signUp.password) && // true
            /[0-9]/.test(signUp.password) && // true
            signUp.confirmPassword.length !== 0 && // true
            signUp.password === signUp.confirmPassword // true
        ) {
            dispatch(
                addUser({
                    ...signUp,
                    fullname: signUp.fullname.replace(
                        /[A-z]+/g,
                        soz => soz.charAt(0).toUpperCase() + soz.slice(1)
                    ),
                })
            )
            setLoading(true)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <div id='signup'>
            <Typography variant='h6' my={5}>
                Create Account
            </Typography>
            <Box component='form' sx={{ '& .MuiInput-root': { width: '100%' } }} noValidate>
                <Box border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`} borderRadius={2} p={4}>
                    {/* Username */}
                    <FormControl variant='standard' color='error' sx={{ display: 'block', mb: 2 }}>
                        <InputLabel htmlFor='usernameup'>Username</InputLabel>
                        <Input
                            id='usernameup'
                            name='username'
                            placeholder='Username'
                            value={signUp.username}
                            onChange={e =>
                                setSignUp({ ...signUp, username: e.target.value.toLowerCase() })
                            }
                            disabled={loading}
                        />
                        {(usernameError || usernameC) && (
                            <FormHelperText sx={{ color: 'red', my: 1 }}>
                                {usernameError && 'Username is empty'}
                                {usernameC && `It isn't Username`}
                            </FormHelperText>
                        )}
                    </FormControl>
                    {/* Full Name */}
                    <FormControl variant='standard' color='error' sx={{ display: 'block', mb: 2 }}>
                        <InputLabel htmlFor='fullname'>Fullname</InputLabel>
                        <Input
                            id='fullname'
                            name='fullname'
                            placeholder='Fullname'
                            value={signUp.fullname}
                            onChange={e => setSignUp({ ...signUp, fullname: e.target.value })}
                            sx={{ '& .MuiInput-input': { textTransform: 'capitalize' } }}
                            disabled={loading}
                        />
                        {(fullnameError || fullnameC) && (
                            <FormHelperText sx={{ color: 'red', my: 1 }}>
                                {fullnameError && 'Fullname is empty'}
                                {fullnameC && `It isn't Fullname`}
                            </FormHelperText>
                        )}
                    </FormControl>
                    {/* Email */}
                    <FormControl variant='standard' color='error' sx={{ display: 'block', mb: 2 }}>
                        <InputLabel htmlFor='email'>Email</InputLabel>
                        <Input
                            id='email'
                            name='email'
                            placeholder='Email'
                            value={signUp.email}
                            onChange={e => setSignUp({ ...signUp, email: e.target.value })}
                            disabled={loading}
                        />
                        {(emailError || emailC) && (
                            <FormHelperText sx={{ color: 'red', my: 1 }}>
                                {emailError && 'Email is empty'}
                                {emailC && `It isn't Email`}
                            </FormHelperText>
                        )}
                    </FormControl>
                    {/* Create Password */}
                    <FormControl variant='standard' color='error' sx={{ display: 'block', mb: 2 }}>
                        <InputLabel htmlFor='passwordup'>Create Password</InputLabel>
                        <Input
                            id='passwordup'
                            name='password'
                            placeholder='Create Password'
                            type={cPasswordI ? 'text' : 'password'}
                            value={signUp.password}
                            onChange={e => setSignUp({ ...signUp, password: e.target.value })}
                            disabled={loading}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='password'
                                        onClick={() => setCPasswordI(!cPasswordI)}
                                        onMouseDown={e => e.preventDefault()}
                                        disabled={loading}
                                    >
                                        {cPasswordI ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {(cPasswordError || passwordC) && (
                            <FormHelperText sx={{ color: 'red', my: 1 }}>
                                {cPasswordError && 'Create Password is empty'}
                                {passwordC && 'Password is easy'}
                            </FormHelperText>
                        )}
                    </FormControl>
                    {/* Confirm Password */}
                    <FormControl variant='standard' color='error' sx={{ display: 'block', mb: 2 }}>
                        <InputLabel htmlFor='cpassword'>Confirm Password</InputLabel>
                        <Input
                            id='cpassword'
                            name='cpassword'
                            placeholder='Comfirm Password'
                            type={rPasswordI ? 'text' : 'password'}
                            value={signUp.confirmPassword}
                            onChange={e =>
                                setSignUp({ ...signUp, confirmPassword: e.target.value })
                            }
                            disabled={loading}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='cpassword'
                                        onClick={() => setRPasswordI(!rPasswordI)}
                                        onMouseDown={e => e.preventDefault()}
                                        disabled={loading}
                                    >
                                        {rPasswordI ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {rPasswordError && (
                            <FormHelperText sx={{ color: 'red', my: 1 }}>
                                Confirm Password is empty
                            </FormHelperText>
                        )}
                        {equal && (
                            <FormHelperText sx={{ color: 'red', my: 1 }}>
                                Please, check Confirm Password
                            </FormHelperText>
                        )}
                    </FormControl>
                </Box>
                <FormControlLabel
                    control={<Checkbox color='error' />}
                    label='Remember my details'
                    sx={{ display: 'block', my: 2 }}
                    checked={signUp.check}
                    onChange={e => setSignUp({ ...signUp, check: e.target.checked })}
                    disabled={loading}
                />
                <LoadingButton
                    color='error'
                    variant='contained'
                    sx={{ width: '100%' }}
                    onClick={signup}
                    size='large'
                    loading={loading}
                >
                    create account
                </LoadingButton>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                >
                    <Alert severity='success' variant='filled'>
                        Endi Loginni to'ldirib, ishizi dovom ettirin!
                    </Alert>
                </Snackbar>
            </Box>
        </div>
    )
}

export default SignUp
