import { Suspense } from 'react'
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
import { ToastContainer } from 'react-toastify'
import { Footer, Sidebar } from './Components'
import links from './Routes'

import 'react-toastify/dist/ReactToastify.css'
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
                <Suspense fallback={false}>
                    <div className='App'>
                        <CssBaseline />
                        <Sidebar />
                        <Toolbar id='back-to-top-anchor' />
                        <Routes>
                            {links.map((link, index) => (
                                <Route path={link.path} element={<link.element />} key={index} />
                            ))}
                        </Routes>
                        <Footer />
                        <ScrollTop {...props}>
                            <Fab
                                size='small'
                                sx={{ bgcolor: 'red' }}
                                aria-label='scroll back to top'
                            >
                                <KeyboardArrowUpIcon />
                            </Fab>
                        </ScrollTop>
                        <ToastContainer />
                    </div>
                </Suspense>
            </Router>
        </ThemeProvider>
    )
}

export default App
