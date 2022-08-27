import { lazy } from 'react'

const HomePage = lazy(() => import('./../Screens/Home'))
const Login = lazy(() => import('./../Screens/Login'))
const UserProfile = lazy(() => import('./../Screens/UserProfile'))
const Pc = lazy(() => import('./../Screens/Pc'))
const ShoppingCart = lazy(() => import('./../Screens/ShoppingCart.js'))
const Error = lazy(() => import('./../Screens/Error'))
const AdminPanel = lazy(() => import('./../Screens/AdminPanel'))

const links = [
    { path: '/', element: HomePage },
    { path: '/login', element: Login },
    { path: '/user/:keyword', element: UserProfile },
    { path: '/pc/:id', element: Pc },
    { path: '/shoppingcart', element: ShoppingCart },
    { path: '/admin/:keyword', element: AdminPanel },
    { path: '*', element: Error },
]

export default links
