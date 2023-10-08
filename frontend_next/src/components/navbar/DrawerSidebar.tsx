import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Home from '@mui/icons-material/Home'
import Computer from '@mui/icons-material/Computer'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import ContactsIcon from '@mui/icons-material/Contacts'
import classNames from 'classnames'

interface IDrawerSidebar {
  setAnchorElNav: (value: boolean) => void
}

const DrawerSidebar: FC<IDrawerSidebar> = ({ setAnchorElNav }) => {
  const { t } = useTranslation()
  const router = useRouter()
  // const location = useLocation()

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
              href={url}
              component={Link}
              onClick={() => setAnchorElNav(false)}
              sx={{ color: classNames({ red: router.pathname === url }) }}
            >
              <ListItemIcon sx={{ color: classNames({ red: router.pathname === url }) }}>
                {icon}
              </ListItemIcon>
              <ListItemText
                sx={{ color: classNames({ red: router.pathname === url }) }}
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
