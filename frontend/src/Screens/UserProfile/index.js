import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { Sidebar } from '../../Components'

const AccountInfo = lazy(() => import('./AccountInfo'))
const Address = lazy(() => import('./Address'))
const Orders = lazy(() => import('./Order'))

const UserProfile = () => {
    const navigate = useNavigate()

    document.title = user.fullname ?? 'Pc Store'

    const token = localStorage.getItem('token')
    useEffect(() => {
        if (!token) navigate('/login')
    }, [token, navigate])

    return (
        <Sidebar
            items={[
                {
                    name: 'user_info',
                    link: '/account',
                    icon: <PersonIcon />,
                    element: <AccountInfo />,
                },
                {
                    name: 'address_book',
                    link: '/address',
                    icon: <HomeIcon />,
                    element: <Address />,
                },
                { name: 'my_orders', link: '/orders', icon: <ListAltIcon />, element: <Orders /> },
            ]}
            baseUrl='/user'
            title='account_dashboard'
            id='userProfile'
        />
    )
}

export default UserProfile
