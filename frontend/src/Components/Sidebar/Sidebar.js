import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
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
import { Link } from 'react-scroll'
import MenuIcon from '@mui/icons-material/Menu'
import Logout from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { changeMode, userProfile } from '../../redux/user/login'
import { Others, UserSetting } from './Others'
import './sidebar.scss'

const pages = [
    { name: 'Home', url: '/', id: 'home', offset: -128 },
    { name: 'Products', url: '/nmadir', id: 'pcs', offset: -80 },
    { name: 'Services', url: '/kimdir', id: 'pcs', offset: 100 },
    { name: 'Contact', url: '/kimdir1', id: 'pcs', offset: 100 },
]

const settings = [
    { name: 'Profile', url: '/user/account', icon: PermIdentityIcon },
    { name: 'Logout', url: '/', icon: Logout },
]

const Sidebar = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [userCheck, setUserCheck] = useState(false)

    const { dark_mode, user } = useSelector(state => state.login)
    const token = localStorage.getItem('token')

    const handleCloseNavMenu = url => {
        setAnchorElNav(null)
        navigate(url)
    }

    const handleCloseUserMenu = () => setAnchorElUser(null)

    useEffect(() => {
        if (token) dispatch(userProfile())
    }, [dispatch, token])

    useEffect(() => {
        if (user && token) setUserCheck(true)
        else setUserCheck(false)
    }, [user, token])

    return (
        <Box>
            <CssBaseline />
            <AppBar
                id='sidebar'
                sx={{ boxShadow: 0 }}
                className={dark_mode ? 'sidebarfon' : 'sidebar-fon'}
            >
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Others sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} />
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={event => setAnchorElNav(event.currentTarget)}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {/* small */}
                                {pages.map(page => (
                                    <Link
                                        key={page.name}
                                        to={page.id}
                                        spy={true}
                                        smooth={true}
                                        offset={page.offset}
                                        duration={500}
                                        style={{ color: dark_mode ? 'white' : 'black' }}
                                    >
                                        {page.name}
                                    </Link>
                                ))}
                            </Menu>
                        </Box>
                        <Others sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} />
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                                justifyContent: 'end',
                            }}
                        >
                            {/* big */}
                            {pages.map(page => (
                                <Link
                                    key={page.name}
                                    to={page.id}
                                    spy={true}
                                    smooth={true}
                                    offset={page.offset}
                                    duration={500}
                                    style={{ color: dark_mode ? 'white' : 'black' }}
                                    className={
                                        location.pathname !== '/' && dark_mode
                                            ? 'disactivew'
                                            : location.pathname !== '/' && !dark_mode
                                            ? 'disactiveb'
                                            : ''
                                    }
                                >
                                    {page.name}
                                </Link>
                            ))}
                        </Box>
                        <IconButton
                            onClick={() => dispatch(changeMode())}
                            sx={{ color: !dark_mode && 'black' }}
                        >
                            {dark_mode ? <BrightnessHighIcon /> : <Brightness4Icon />}
                        </IconButton>
                        <IconButton
                            aria-label='shopping cart'
                            sx={{
                                mr: 1,
                                color:
                                    location.pathname === '/shoppingcart'
                                        ? 'red'
                                        : dark_mode
                                        ? 'white'
                                        : 'black',
                            }}
                        >
                            <Badge badgeContent={4} color='error'>
                                <ShoppingCartIcon size='small' />
                            </Badge>
                        </IconButton>
                        <Box sx={{ flexGrow: 0 }}>
                            <Button
                                variant='outlined'
                                onClick={event =>
                                    userCheck
                                        ? setAnchorElUser(event.currentTarget)
                                        : navigate('/login')
                                }
                                color={dark_mode ? 'inherit' : 'error'}
                                sx={{ ml: 1 }}
                            >
                                <Typography textTransform={userCheck ? 'lowercase' : 'capitalize'}>
                                    {userCheck ? user && `@${user.username}` : 'sign in'}
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
                                {user.isAdmin && (
                                    <MenuItem onClick={handleCloseUserMenu} sx={{ p: 0 }}>
                                        <ListItemIcon sx={{ pr: 1, pl: 2 }}>
                                            <AdminPanelSettingsIcon />
                                        </ListItemIcon>
                                        <UserSetting url='/admin/pcs' dark_mode={dark_mode} name='Admin' />
                                    </MenuItem>
                                )}
                                {settings.map(setting => (
                                    <MenuItem
                                        key={setting.name}
                                        onClick={handleCloseUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <ListItemIcon sx={{ pr: 1, pl: 2 }}>
                                            <setting.icon />
                                        </ListItemIcon>
                                        <UserSetting
                                            url={setting.url}
                                            dark_mode={dark_mode}
                                            name={setting.name}
                                        />
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </Box>
    )
}
export default Sidebar
