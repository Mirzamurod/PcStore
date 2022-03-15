import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Title from '../Title'
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    TextField,
} from '@mui/material'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'

const AccountInfo = memo(() => {
    const [user1, setUser] = useState({ username: '', fullname: '', email: '' })
    const [usernameE, setUsernameE] = useState(false) // empty
    const [usernameC, setUsernameC] = useState(false) // check
    const [fullnameE, setFullnameE] = useState(false)
    const [fullnameC, setFullnameC] = useState(false)
    const [emailE, setEmailE] = useState(false)
    const [emailC, setEmailC] = useState(false)
    const [oldP, setOldP] = useState({ current: false, new: false, confirm: false })
    const [newP, setNewP] = useState({ current: '', new: '', confirm: '' })
    const [currentE, setCurrentE] = useState(false)
    const [newE, setNewE] = useState(false)
    const [newC, setNewC] = useState(false)
    const [confirmE, setConfirmE] = useState(false)
    const [show, setShow] = useState(false)
    const [save, setSave] = useState(true)
    const [currentPassword, setCurrentPassword] = useState(false)
    const [confirmNewPassword, setConfirmNewPassword] = useState(false)

    const { dark_mode, user } = useSelector(state => state.login)

    useEffect(() => {
        if (user)
            setUser({ username: user?.username, fullname: user?.fullname, email: user?.email })
    }, [user])

    useEffect(() => {
        if (
            user1.username !== user?.username ||
            user1.fullname !== user?.fullname ||
            user1.email !== user?.email ||
            newP.current.length !== 0 ||
            newP.new.length !== 0 ||
            newP.confirm.length !== 0
        )
            setSave(false)
        else setSave(true)
    }, [user1, newP, user])

    const saveChanges = e => {
        e.preventDefault()
        const symbol = /\W/g
        const usernameCheck = /[a-z]+/g
        const fullnameCheck = /[A-z]+\s[A-z]+/
        const emailCheck = /[\w.]+@\w+\.(com|ru)/

        ;[
            {
                name: usernameCheck.test(user1.username) && symbol.test(user1.username),
                change: setUsernameC,
            },
            {
                name:
                    !fullnameCheck.test(user1.fullname) ||
                    user1.fullname.match(/\s/g).length !== 1 ||
                    user1.fullname.match(symbol).length !== 1 ||
                    /[0-9]/.test(user1.fullname),
                change: setFullnameC,
            },
            { name: !emailCheck.test(user1.email), change: setEmailC },
            {
                name:
                    newP.new.length !== 0 &&
                    (!/\W/.test(newP.new) ||
                        !/[A-Z]/.test(newP.new) ||
                        !/[a-z]/.test(newP.new) ||
                        !/[0-9]/.test(newP.new)),
                change: setNewC,
            },
        ].forEach(check => {
            if (check.name) check.change(true)
            else check.change(false)
        })

        const checkShow =
            user1.username.length !== 0 && // true
            !symbol.test(user1.username) && // true
            !usernameCheck.test(user1.username) && // true
            user1.fullname.length !== 0 && // true
            fullnameCheck.test(user1.fullname) && // true
            user1.fullname.match(/\s/g).length === 1 && // true
            user1.fullname.match(symbol).length === 1 && // true
            !/[0-9]/.test(user1.fullname) && // true
            user1.email.length !== 0 // true

        const check = [
            { name: user1.username.length === 0, change: setUsernameE },
            { name: user1.fullname.length === 0, change: setFullnameE },
            { name: user1.email.length === 0, change: setEmailE },
        ]

        if (!show) {
            if (checkShow) {
                console.log({
                    ...user1,
                    fullname: user1.fullname.replace(
                        /[A-z]+/g,
                        soz => soz.charAt(0).toUpperCase() + soz.slice(1)
                    ),
                })
            }

            check.forEach(check => {
                if (check.name) check.change(true)
                else check.change(false)
            })
        } else {
            if (
                checkShow &&
                user1.username.length !== 0 &&
                user1.fullname.length !== 0 &&
                user1.email.length !== 0 &&
                newP.current.length !== 0 &&
                newP.new.length !== 0 &&
                newP.confirm.length !== 0 &&
                newP.new === newP.confirm
            ) {
                console.log({ ...user1, ...newP })
            }

            ;[
                ...check,
                { name: newP.current.length === 0, change: setCurrentE },
                { name: newP.new.length === 0, change: setNewE },
                { name: newP.confirm.length === 0, change: setConfirmE },
                { name: newP.new !== newP.confirm, change: setConfirmNewPassword },
                { name: newP.current !== '123', change: setCurrentPassword },
            ].forEach(check => {
                if (check.name) check.change(true)
                else check.change(false)
            })
        }
    }

    return (
        <Box id='accountInfo'>
            <Box my={3}>
                <Title title='User Information' />
            </Box>
            <Box className={`fon ${dark_mode ? 'dark' : 'light'}`}>
                <Grid container spacing={4}>
                    <Grid item md={6}>
                        <Box
                            border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`}
                            borderRadius={2}
                            p={4}
                            component='form'
                            noValidate
                            sx={{
                                '& .MuiFormControl-root': { width: '100%' },
                                '& .MuiFormHelperText-root': { color: 'red' },
                            }}
                        >
                            <TextField
                                label='Username'
                                placeholder='pcstore'
                                variant='standard'
                                color='error'
                                id='username'
                                value={user1.username}
                                onChange={e =>
                                    setUser({ ...user1, username: e.target.value.toLowerCase() })
                                }
                                sx={{ mb: 2 }}
                                helperText={
                                    usernameE
                                        ? 'Username is empty'
                                        : usernameC
                                        ? `It isn't Username`
                                        : ''
                                }
                            />
                            <TextField
                                label='Fullname'
                                placeholder='Xolov Obid'
                                variant='standard'
                                color='error'
                                id='fullname'
                                value={user1.fullname}
                                onChange={e => setUser({ ...user1, fullname: e.target.value })}
                                sx={{ mb: 2, '& .MuiInput-input': { textTransform: 'capitalize' } }}
                                helperText={
                                    fullnameE
                                        ? 'Fullname is empty'
                                        : fullnameC
                                        ? `It isn't Fullname`
                                        : ''
                                }
                            />
                            <TextField
                                label='Email'
                                placeholder='example@gmail.com'
                                type='email'
                                variant='standard'
                                color='error'
                                id='email'
                                value={user1.email}
                                onChange={e => setUser({ ...user1, email: e.target.value })}
                                helperText={
                                    emailE ? 'Email is empty' : emailC ? `It isn't Email` : ''
                                }
                            />
                        </Box>
                    </Grid>
                    <Grid item md={6} display={show ? 'unset' : 'none'}>
                        <Box
                            border={`1px solid ${dark_mode ? '#e2e4e5' : 'gray'}`}
                            borderRadius={2}
                            p={4}
                            component='form'
                            noValidate
                            sx={{ '& .MuiFormControl-root': { width: '100%' } }}
                        >
                            {/* Current Password */}
                            <FormControl variant='standard' color='error' sx={{ mb: 2 }}>
                                <InputLabel htmlFor='currentPassword'>Current Password</InputLabel>
                                <Input
                                    id='currentPassword'
                                    placeholder='Current Password'
                                    autoComplete='false'
                                    type={oldP.current ? 'text' : 'password'}
                                    value={newP.current}
                                    onChange={e => setNewP({ ...newP, current: e.target.value })}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='current-password'
                                                onClick={() =>
                                                    setOldP({ ...oldP, current: !oldP.current })
                                                }
                                                onMouseDown={e => e.preventDefault()}
                                            >
                                                {oldP.current ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {(currentE || currentPassword) && (
                                    <FormHelperText sx={{ color: 'red' }}>
                                        {currentE && 'Current is empty'}
                                        {currentPassword && 'Current password error'}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            {/* New Password */}
                            <FormControl variant='standard' color='error' sx={{ mb: 2 }}>
                                <InputLabel htmlFor='newPassword'>New Password</InputLabel>
                                <Input
                                    id='newPassword'
                                    autoComplete='false'
                                    placeholder='RXrv8dJ_'
                                    type={oldP.new ? 'text' : 'password'}
                                    value={newP.new}
                                    onChange={e => setNewP({ ...newP, new: e.target.value })}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='new-password'
                                                onClick={() => setOldP({ ...oldP, new: !oldP.new })}
                                                onMouseDown={e => e.preventDefault()}
                                            >
                                                {oldP.new ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {(newE || newC) && (
                                    <FormHelperText sx={{ color: 'red' }}>
                                        {newE && 'New Password is empty'}
                                        {newC && 'Password is easy'}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            {/* Confirm New Password */}
                            <FormControl variant='standard' color='error'>
                                <InputLabel htmlFor='confirmNewPassword'>
                                    Confirm New Password
                                </InputLabel>
                                <Input
                                    id='confirmNewPassword'
                                    type={oldP.confirm ? 'text' : 'password'}
                                    value={newP.confirm}
                                    onChange={e => setNewP({ ...newP, confirm: e.target.value })}
                                    autoComplete='false'
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='confirm-new-password'
                                                onClick={() =>
                                                    setOldP({ ...oldP, confirm: !oldP.confirm })
                                                }
                                                onMouseDown={e => e.preventDefault()}
                                            >
                                                {oldP.confirm ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {(confirmE || confirmNewPassword) && (
                                    <FormHelperText sx={{ color: 'red' }}>
                                        {confirmE && 'Confirm Password is empty'}
                                        {confirmNewPassword &&
                                            'Confirm Password is not equal to New Password'}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
                <Button
                    size='large'
                    color='error'
                    onClick={() => setShow(!show)}
                    sx={{ textTransform: 'capitalize', mt: 4 }}
                >
                    change password
                </Button>
            </Box>
            <Button
                variant='contained'
                color='error'
                size='large'
                sx={{ textTransform: 'capitalize', my: 4 }}
                disabled={save}
                onClick={saveChanges}
            >
                Save Changes
            </Button>
        </Box>
    )
})

export default AccountInfo
