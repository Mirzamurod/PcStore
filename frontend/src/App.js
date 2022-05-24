import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {
    Box,
    createTheme,
    CssBaseline,
    Fab,
    ThemeProvider,
    Toolbar,
    useScrollTrigger,
    Zoom,
} from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import HomePage from './Screens/Home/HomePage'
import Login from './Screens/Login/Login'
import Sidebar from './Components/Sidebar/Sidebar'
import Footer from './Components/Footer/Footer'
import UserProfile from './Screens/UserProfile/UserProfile'
import Pc from './Screens/Pc/Pc'
import ShoppingCart from './Screens/ShoppingCart.js/ShoppingCart'
import Error from './Components/Error'
import AdminPanel from './Screens/AdminPanel/AdminPanel'
import 'swiper/css'
import 'swiper/css/bundle'
import './App.scss'

function ScrollTop(props) {
    const { children, window } = props
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = event => {
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

ScrollTop.propTypes = { children: PropTypes.element.isRequired, window: PropTypes.func }

function App(props) {
    const { dark_mode } = useSelector(state => state.login)
    const theme = createTheme({ palette: { mode: dark_mode ? 'dark' : 'light' } })

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className='App'>
                    <CssBaseline />
                    <Sidebar />
                    <Toolbar id='back-to-top-anchor' />
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/user/:keyword' element={<UserProfile />} />
                        <Route path='/pc/:id' element={<Pc />} />
                        <Route path='/shoppingcart' element={<ShoppingCart />} />
                        <Route path='/admin/:keyword' element={<AdminPanel />} />
                        <Route path='*' element={<Error />} />
                    </Routes>
                    <Footer />
                    <ScrollTop {...props}>
                        <Fab size='small' sx={{ bgcolor: 'red' }} aria-label='scroll back to top'>
                            <KeyboardArrowUpIcon />
                        </Fab>
                    </ScrollTop>
                </div>
            </Router>
        </ThemeProvider>
    )
}

export default App
