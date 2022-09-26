import React from 'react'
import ReactDOM from 'react-dom'
import 'react-alice-carousel/lib/alice-carousel.css'
import 'flag-icons/css/flag-icons.min.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>,
    // </React.StrictMode>,
    document.getElementById('root')
)

reportWebVitals()
