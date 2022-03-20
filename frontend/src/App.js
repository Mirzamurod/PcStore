import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
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
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import HomePage from './Screens/Home/HomePage'
import Login from './Screens/Login/Login'
import Sidebar from './Components/Sidebar/Sidebar'
import Footer from './Components/Footer/Footer'
import UserProfile from './Screens/UserProfile/UserProfile'
import Pc from './Screens/Pc/Pc'
import ShoppingCart from './Screens/ShoppingCart.js/ShoppingCart'
import './App.scss'
import Error from './Components/Error'

function ScrollTop(props) {
    const { children, window } = props
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    })

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')

        if (anchor) {
            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        }
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

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
}

function App(props) {
    const { dark_mode } = useSelector(state => state.login)
    const theme = createTheme({
        palette: {
            mode: dark_mode ? 'dark' : 'light',
        },
    })

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className='App'>
                    <CssBaseline />
                    <Sidebar />
                    <Toolbar id='back-to-top-anchor' />
                    <Routes>
                        <Route path='/' element={<HomePage />} exact />
                        <Route path='/login' element={<Login />} exact />
                        <Route path='/user/:keyword' element={<UserProfile />} />
                        <Route path='/pc/:id' element={<Pc />} />
                        <Route path='/shoppingcart' element={<ShoppingCart />} />
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