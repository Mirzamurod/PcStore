import { ReactNode, memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  Link as MuiLink,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
  useScrollTrigger,
  Zoom,
  Fab,
} from '@mui/material'
import classNames from 'classnames'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import MenuIcon from '@mui/icons-material/Menu'
import Logout from '@mui/icons-material/Logout'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LightModeIcon from '@mui/icons-material/LightMode'
import ModeNightIcon from '@mui/icons-material/ModeNight'
import { Others } from '@/components/navbar/Others'
import DrawerSidebar from '@/components/navbar/DrawerSidebar'
import { RootState } from '@/store'
import { changeMode, deleteUser } from '@/store/user/login'
import { useRouter } from 'next/router'

const pages = [
  { name: 'home', url: '/' },
  { name: 'products', url: '/products' },
  { name: 'services', url: '/services' },
  { name: 'contact', url: '/contact' },
]

function ScrollTop(props: { children: ReactNode; window: Function }) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: any) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')

    if (anchor) anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role='presentation'
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  )
}

const Navbar = memo((props: any) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const router = useRouter()
  const pathname = usePathname()
  const [anchorElNav, setAnchorElNav] = useState<boolean>(false)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [userCheck, setUserCheck] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const lang = JSON.parse(localStorage.getItem('lang')!) ?? { lang: 'us', name: 'Eng' }
  const [changeLang, setChangeLang] = useState<{ lang: string; name: string }>(lang)

  const open = Boolean(anchorEl)
  const handleClose = () => setAnchorEl(null)

  const handleCloseUserMenu = () => setAnchorElUser(null)

  const { dark_mode, user } = useSelector((state: RootState) => state.login)

  const changelang = (lang: string, name: string) => {
    i18next.changeLanguage(lang)
    setChangeLang({ lang, name })
  }

  const selectLang = (lang: string, name: string) => {
    handleClose()
    changelang(lang, name)
  }

  const logout = () => {
    localStorage.removeItem('token')
    dispatch(deleteUser())
    handleCloseUserMenu()
    router.reload()
  }

  useEffect(() => {
    localStorage.setItem('lang', JSON.stringify(changeLang))
  }, [changeLang])

  useEffect(() => {
    if (user) setUserCheck(true)
    else setUserCheck(false)
  }, [user])

  return (
    <Box>
      <CssBaseline />
      <AppBar id='navbar' sx={{ boxShadow: 0 }} className={dark_mode ? 'navbarfon' : 'navbar-fon'}>
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
                  <MuiLink
                    component={Link}
                    key={page.name}
                    href={page.url}
                    px={1}
                    mx={1}
                    sx={{
                      color: pathname !== page.url ? (dark_mode ? 'white' : 'black') : undefined,
                    }}
                    color={pathname === page.url ? 'error' : 'inherit'}
                  >
                    {t(page.name)}
                  </MuiLink>
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
                  color: pathname === '/shoppingcart' ? 'red' : dark_mode ? 'white' : 'black',
                }}
              >
                <Badge badgeContent={4} color='error'>
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Box>
                <Button
                  id='demo-positioned-button'
                  aria-controls={open ? 'demo-positioned-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                  onClick={(event: any) => setAnchorEl(event.currentTarget)}
                  variant='text'
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
                      <MenuItem onClick={() => selectLang(lang, name)} key={index}>
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
                  onClick={(event: any) =>
                    userCheck ? setAnchorElUser(event.currentTarget) : router.replace('/login')
                  }
                  color={dark_mode ? 'inherit' : 'error'}
                  sx={{ ml: 1 }}
                >
                  <Typography textTransform={userCheck ? 'lowercase' : 'capitalize'}>
                    {userCheck ? user && `@${user?.username}` : t('sign_in')}
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
                  {user?.isAdmin ? (
                    <MenuItem component={Link} href='/admin/pcs' onClick={handleCloseUserMenu}>
                      <ListItemIcon>
                        <AdminPanelSettingsIcon />
                      </ListItemIcon>
                      {t('admin')}
                    </MenuItem>
                  ) : null}
                  <MenuItem component={Link} href='/user/account'>
                    <ListItemIcon>
                      <PermIdentityIcon />
                    </ListItemIcon>
                    {t('profile')}
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <ListItemIcon>
                      <Logout />
                    </ListItemIcon>
                    {t('logout')}
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
      <ScrollTop {...props}>
        <Fab size='small' sx={{ bgcolor: 'red' }} aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Box>
  )
})

export default Navbar
