import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary'
import StorefrontIcon from '@mui/icons-material/Storefront'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import ChatIcon from '@mui/icons-material/Chat'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import { currentUserId } from '../data/mock'

const DRAWER_WIDTH = 240

interface NavItem {
  label: string
  path: string
  icon: ReactNode
}

const navItems: NavItem[] = [
  { label: 'Главная', path: '/home', icon: <HomeIcon /> },
  { label: 'Книжная полка', path: '/library', icon: <LocalLibraryIcon /> },
  { label: 'Дневник', path: '/diary', icon: <AutoStoriesIcon /> },
  { label: 'Библиотека', path: '/market', icon: <StorefrontIcon /> },
  { label: 'Лента', path: '/social', icon: <DynamicFeedIcon /> },
  { label: 'Чаты', path: '/chats', icon: <ChatIcon /> },
  { label: 'ИИ-ассистент', path: '/assistant', icon: <SmartToyIcon /> },
  { label: 'Профиль', path: `/profile/${currentUserId}`, icon: <PersonIcon /> },
  { label: 'Настройки', path: '/settings', icon: <SettingsIcon /> },
]

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const drawerContent = (
    <Box>
      <Toolbar />
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname.startsWith(item.path)}
            onClick={() => setMobileOpen(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            Читатель
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, minWidth: 0 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}