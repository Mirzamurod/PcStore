import { Link as RouterLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Home from '@mui/icons-material/Home'
import Computer from '@mui/icons-material/Computer'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import ContactsIcon from '@mui/icons-material/Contacts'
import classNames from 'classnames'

const DrawerSidebar = ({ setAnchorElNav }) => {
    const { t } = useTranslation()
    const location = useLocation()

    return (
        <Box>
            <List>
                {[
                    { name: 'home', url: '/', icon: <Home /> },
                    { name: 'products', url: '/products', icon: <Computer /> },
                    { name: 'services', url: '/services', icon: <MiscellaneousServicesIcon /> },
                    { name: 'contact', url: '/contact', icon: <ContactsIcon /> },
                ].map(({ name, url, icon }, index) => (
                    <ListItem key={index}>
                        <ListItemButton
                            to={url}
                            component={RouterLink}
                            onClick={() => setAnchorElNav(false)}
                            sx={{ color: classNames({ red: location.pathname === url }) }}
                        >
                            <ListItemIcon
                                sx={{ color: classNames({ red: location.pathname === url }) }}
                            >
                                {icon}
                            </ListItemIcon>
                            <ListItemText
                                sx={{ color: classNames({ red: location.pathname === url }) }}
                                primary={t(name)}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}

export default DrawerSidebar
