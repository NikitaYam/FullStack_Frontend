import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  Drawer,
  Fade,
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
import { CURRENT_USER_ID } from '@/entities/user'
import { routes } from '@/shared/config/routes'

const DRAWER_WIDTH = 240

interface NavItem {
  label: string
  path: string
  icon: ReactNode
}

const navItems: NavItem[] = [
  { label: 'Главная', path: routes.home, icon: <HomeIcon /> },
  { label: 'Книжная полка', path: routes.library, icon: <LocalLibraryIcon /> },
  { label: 'Дневник', path: routes.diary, icon: <AutoStoriesIcon /> },
  { label: 'Библиотека', path: routes.market, icon: <StorefrontIcon /> },
  { label: 'Лента', path: routes.social, icon: <DynamicFeedIcon /> },
  { label: 'Чаты', path: routes.chats, icon: <ChatIcon /> },
  { label: 'ИИ-ассистент', path: routes.assistant, icon: <SmartToyIcon /> },
  { label: 'Профиль', path: routes.profile(CURRENT_USER_ID), icon: <PersonIcon /> },
  { label: 'Настройки', path: routes.settings, icon: <SettingsIcon /> },
]

/** Каркас страниц приложения: шапка, боковое меню и область контента */
export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  // При переходе на другую страницу прокручиваем её в начало
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

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
            aria-label="Открыть меню"
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
        {/* key по адресу: при каждом переходе новая страница плавно проявляется */}
        <Fade key={location.pathname} in timeout={300}>
          <Box>
            <Outlet />
          </Box>
        </Fade>
      </Box>
    </Box>
  )
}
