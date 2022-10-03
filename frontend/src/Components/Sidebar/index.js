import { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import {
    AppBar,
    Badge,
    Box,
    Button,
    Container,
    CssBaseline,
    Drawer,
    IconButton,
    Link,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    MenuList,
    Toolbar,
    Typography,
} from '@mui/material'
// import { Link } from 'react-scroll'
import MenuIcon from '@mui/icons-material/Menu'
import Logout from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import { changeMode, userProfile } from '../../redux'
import { Others, UserSetting } from './Others'
import DrawerSidebar from './DrawerSidebar'
import links from './../../Routes'

import './sidebar.scss'
import classNames from 'classnames'

const pages = [
    { name: 'home', url: '/' },
    { name: 'products', url: '/products' },
    { name: 'services', url: '/services' },
    { name: 'contact', url: '/contact' },
]

const settings = [
    { name: 'profile', url: '/user/account', icon: PermIdentityIcon },
    { name: 'logout', url: '/', icon: Logout },
]

const Sidebar = memo(() => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = useState(false)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [userCheck, setUserCheck] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const lang = JSON.parse(localStorage.getItem('lang')) ?? { lang: 'us', name: 'Eng' }
    const [changeLang, setChangeLang] = useState(lang)

    const open = Boolean(anchorEl)
    const handleClose = () => setAnchorEl(null)

    const changelang = (lang, name) => {
        i18next.changeLanguage(lang)
        setChangeLang({ lang, name })
    }

    const nimadir = (lang, name) => {
        handleClose()
        changelang(lang, name)
    }

    useEffect(() => {
        localStorage.setItem('lang', JSON.stringify(changeLang))
    }, [changeLang])

    const { dark_mode, user } = useSelector(state => state.login)
    const token = localStorage.getItem('token')

    useEffect(() => {
        links.filter(
            item =>
                // if (item.path === location.pathname && item.login && !token) return navigate('/login')
                // else if
                item.path === location.pathname &&
                token &&
                item.login &&
                item.isAdmin &&
                user.isAdmin &&
                navigate('/')
        )
    }, [location.pathname, navigate, token, user])

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
                    <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                        <Box>
                            <Others sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} />
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size='large'
                                    aria-label='account of current user'
                                    aria-controls='menu-appbar'
                                    aria-haspopup='true'
                                    onClick={() => setAnchorElNav(true)}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Drawer open={anchorElNav} onClose={() => setAnchorElNav(false)}>
                                    <DrawerSidebar setAnchorElNav={setAnchorElNav} />
                                </Drawer>
                            </Box>
                        </Box>
                        <Others sx={{ display: { xs: 'flex', md: 'none' } }} />
                        {/* big */}
                        <Box display='flex' alignItems='center'>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: 'none', md: 'flex' },
                                    justifyContent: 'end',
                                }}
                            >
                                {pages.map(page => (
                                    <Link
                                        component={RouterLink}
                                        key={page.name}
                                        to={page.url}
                                        px={1}
                                        mx={1}
                                        sx={{
                                            color:
                                                location.pathname !== page.url &&
                                                (dark_mode ? 'white' : 'black'),
                                        }}
                                        color={location.pathname === page.url ? 'error' : 'inherit'}
                                    >
                                        {t(page.name)}
                                    </Link>
                                ))}
                            </Box>
                            <IconButton
                                onClick={() => dispatch(changeMode())}
                                sx={{ color: classNames({ black: !dark_mode }) }}
                                color='inherit'
                            >
                                {dark_mode ? <LightModeIcon /> : <ModeNightIcon />}
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
                            <Box>
                                <Button
                                    id='demo-positioned-button'
                                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                                    aria-haspopup='true'
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={event => setAnchorEl(event.currentTarget)}
                                    // variant='outlined'
                                    startIcon={<span className={`fi fi-${changeLang.lang}`} />}
                                    sx={{ color: dark_mode ? 'white' : 'black' }}
                                >
                                    {changeLang.name}
                                </Button>
                                <Menu
                                    id='demo-positioned-menu'
                                    aria-labelledby='demo-positioned-button'
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                >
                                    <MenuList sx={{ color: classNames({ black: !dark_mode }) }}>
                                        {[
                                            { lang: 'uz', name: 'Uz' },
                                            { lang: 'ru', name: 'Ru' },
                                            { lang: 'us', name: 'Eng' },
                                        ].map(({ lang, name }, index) => (
                                            <MenuItem
                                                onClick={() => nimadir(lang, name)}
                                                key={index}
                                            >
                                                <ListItemIcon>
                                                    <span className={`fi fi-${lang}`} />
                                                </ListItemIcon>
                                                <ListItemText color=''>{name}</ListItemText>
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </Menu>
                            </Box>
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
                                    <Typography
                                        textTransform={userCheck ? 'lowercase' : 'capitalize'}
                                    >
                                        {userCheck ? user && `@${user.username}` : t('sign_in')}
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
                                            <UserSetting
                                                url='/admin/pcs'
                                                dark_mode={dark_mode}
                                                name='admin'
                                            />
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
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </Box>
    )
})

export default Sidebar
