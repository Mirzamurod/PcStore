import { lazy, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ComputerIcon from '@mui/icons-material/Computer'
import ListAltIcon from '@mui/icons-material/ListAlt'
import GroupIcon from '@mui/icons-material/Group'
import FilterListIcon from '@mui/icons-material/FilterList'
import { Sidebar } from '../../Components'

const Pcs = lazy(() => import('./Pcs'))
const Orders = lazy(() => import('./Orders'))
const Users = lazy(() => import('./Users'))
const Filters = lazy(() => import('./Filters'))

const AdminPanel = () => {
    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    useEffect(() => {
        if (!token) navigate('/login')
    }, [token, navigate])

    return (
        <Sidebar
            items={[
                { name: 'pcs', link: '/pcs', icon: <ComputerIcon />, element: <Pcs /> },
                { name: 'orders', link: '/orders', icon: <ListAltIcon />, element: <Orders /> },
                { name: 'users', link: '/users', icon: <GroupIcon />, element: <Users /> },
                {
                    name: 'filters',
                    link: '/filters',
                    icon: <FilterListIcon />,
                    element: <Filters />,
                },
            ]}
            baseUrl='/admin'
            title='admin_panel'
            id='admin'
        />
    )
}

export default AdminPanel
