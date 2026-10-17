import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Card, CardContent, Grow, Tab, Tabs, Typography } from '@mui/material'
import { AuthForm } from '@/features/auth'
import type { AuthMode } from '@/features/auth'
import { routes } from '@/shared/config/routes'

export default function HelloPage() {
  const [mode, setMode] = useState<AuthMode>('login')
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Grow in>
        <Card sx={{ width: '100%', maxWidth: 420 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Читатель
            </Typography>
            <Typography color="text.secondary" align="center" sx={{ mb: 2 }}>
              Библиотека, читалка, дневник и общение с читателями
            </Typography>

            <Tabs value={mode} onChange={(_event, value: AuthMode) => setMode(value)} variant="fullWidth">
              <Tab value="login" label="Вход" />
              <Tab value="register" label="Регистрация" />
            </Tabs>

            <AuthForm mode={mode} onSuccess={() => navigate(routes.home)} />
          </CardContent>
        </Card>
      </Grow>
    </Box>
  )
}
