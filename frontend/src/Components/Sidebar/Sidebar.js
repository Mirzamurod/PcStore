import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
    AppBar,
    Badge,
    Box,
    Button,
    Container,
    CssBaseline,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Logout from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import { changeMode, userProfile } from '../../redux/user/login'
import logo from './../../svg/logo.svg'
import './sidebar.scss'

const pages = [
    { name: 'Home', url: '/', id: 'home' },
    { name: 'Products', url: '/nmadir', id: 'pcs' },
    { name: 'Services', url: '/kimdir', id: 'pcs' },
    { name: 'Contact', url: '/kimdir1', id: 'pcs' },
]
const settings = [
    { name: 'Profile', url: '/user/account', icon: PermIdentityIcon },
    { name: 'Logout', url: '', icon: Logout },
]

const Sidebar = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [userCheck, setUserCheck] = useState(false)

    const { dark_mode, user } = useSelector(state => state.login)

    const handleCloseNavMenu = url => {
        setAnchorElNav(null)
        navigate(url)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (token) dispatch(userProfile())
    }, [dispatch, token])

    useEffect(() => {
        if (user && token) setUserCheck(true)
        else setUserCheck(false)
    }, [user, token])

    return (
        <>
            <CssBaseline />
            <AppBar
                // position='static'
                id='sidebar'
                sx={{ boxShadow: 0 }}
                // color='inherit'
                className={`${dark_mode ? 'sidebarfon' : 'sidebar-fon'}`}
            >
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Link to='/'>
                            <Typography
                                variant='h6'
                                noWrap
                                component='div'
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                <img src={logo} alt='rasm' />
                            </Typography>
                        </Link>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={event => setAnchorElNav(event.currentTarget)}
                                // color='inherit'
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {/* small */}
                                {pages.map(page => (
                                    <MenuItem key={page.name}>
                                        <Typography
                                            onClick={() => handleCloseNavMenu(page.url)}
                                            textAlign='center'
                                            textTransform='capitalize'
                                            sx={{
                                                color: `${dark_mode ? 'white' : 'black'}`,
                                            }}
                                        >
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant='h6'
                            noWrap
                            component='div'
                            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                        >
                            <Link to='/'>
                                <img src={logo} alt='rasm' />
                            </Link>
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'end',
                            }}
                        >
                            {/* big */}
                            {pages.map(page => (
                                <Button
                                    id={page.id}
                                    color={location.pathname === page.url ? 'error' : 'inherit'}
                                    key={page.name}
                                    onClick={() => handleCloseNavMenu(page.url)}
                                    className={`${location.pathname === page.url && 'navbar'}`}
                                    sx={{
                                        my: 2,
                                        color: `${
                                            location.pathname !== page.url && !dark_mode && 'black'
                                        }`,
                                        textTransform: 'capitalize',
                                        position: 'relative',
                                    }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>
                        <IconButton
                            onClick={() => dispatch(changeMode())}
                            sx={{ color: `${!dark_mode && 'black'}` }}
                        >
                            {dark_mode ? <BrightnessHighIcon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton
                            aria-label='shopping cart'
                            sx={{ color: `${!dark_mode && 'black'}`, mr: 1 }}
                        >
                            <Badge badgeContent={4} color='error'>
                                <ShoppingCartIcon size='small' />
                            </Badge>
                        </IconButton>
                        <Box sx={{ flexGrow: 0 }}>
                            {userCheck ? (
                                <>
                                    <Button
                                        variant='outlined'
                                        onClick={event => setAnchorElUser(event.currentTarget)}
                                        color={dark_mode ? 'inherit' : 'error'}
                                        sx={{ ml: 1 }}
                                    >
                                        <Typography textTransform='lowercase'>
                                            {user && `@${user.username}`}
                                        </Typography>
                                    </Button>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id='menu-appbar'
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        keepMounted
                                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map(setting => (
                                            <MenuItem
                                                key={setting.name}
                                                onClick={handleCloseUserMenu}
                                                sx={{ p: 0 }}
                                            >
                                                <ListItemIcon sx={{ pr: 1, pl: 2 }}>
                                                    <setting.icon />
                                                </ListItemIcon>
                                                <Link to={setting.url} style={{ width: '100%' }}>
                                                    <Typography
                                                        sx={{
                                                            py: 1,
                                                            pr: 2,
                                                            color: dark_mode ? 'white' : 'black',
                                                        }}
                                                    >
                                                        {setting.name}
                                                    </Typography>
                                                </Link>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            ) : (
                                <Button
                                    variant='outlined'
                                    sx={{ ml: 1, textTransform: 'capitalize' }}
                                    onClick={() => navigate('/login')}
                                    color={dark_mode ? 'inherit' : 'error'}
                                >
                                    sign in
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </>
    )
}
export default Sidebar
