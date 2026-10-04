import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'

export default function HelloPage() {
  const [tab, setTab] = useState(0)
  const navigate = useNavigate()
  const isRegister = tab === 1

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/home')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Card sx={{ width: '100%', maxWidth: 420 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Читатель
          </Typography>
          <Typography color="text.secondary" align="center" sx={{ mb: 2 }}>
            Библиотека, читалка, дневник и общение с читателями
          </Typography>

          <Tabs value={tab} onChange={(_event, value: number) => setTab(value)} variant="fullWidth">
            <Tab label="Вход" />
            <Tab label="Регистрация" />
          </Tabs>

          <Stack component="form" spacing={2} sx={{ mt: 3 }} onSubmit={handleSubmit}>
            {isRegister && <TextField label="Никнейм" required />}
            <TextField label="Email" type="email" required />
            <TextField label="Пароль" type="password" required />
            {isRegister && <TextField label="Повторите пароль" type="password" required />}
            <Button type="submit" variant="contained" size="large">
              {isRegister ? 'Зарегистрироваться' : 'Войти'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}