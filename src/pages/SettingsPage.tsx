import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { currentUserId, getUser } from '../data/mock'

export default function SettingsPage() {
  const user = getUser(currentUserId)
  const navigate = useNavigate()

  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState('reader@example.com')
  const [notifyMessages, setNotifyMessages] = useState(true)
  const [notifyRecommendations, setNotifyRecommendations] = useState(true)
  const [publicDiary, setPublicDiary] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <Stack spacing={3} sx={{ maxWidth: 500 }}>
      <Typography variant="h4">Настройки</Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Аккаунт</Typography>
          <TextField label="Имя" value={name} onChange={(event) => setName(event.target.value)} />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h6">Уведомления</Typography>
          <FormControlLabel
            control={
              <Switch checked={notifyMessages} onChange={(event) => setNotifyMessages(event.target.checked)} />
            }
            label="Новые сообщения"
          />
          <FormControlLabel
            control={
              <Switch
                checked={notifyRecommendations}
                onChange={(event) => setNotifyRecommendations(event.target.checked)}
              />
            }
            label="Рекомендации ИИ-ассистента"
          />
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h6">Приватность</Typography>
          <FormControlLabel
            control={<Switch checked={publicDiary} onChange={(event) => setPublicDiary(event.target.checked)} />}
            label="Показывать дневник другим читателям"
          />
        </Stack>
      </Paper>

      {saved && (
        <Alert severity="success" onClose={() => setSaved(false)}>
          Настройки сохранены (демо-режим).
        </Alert>
      )}

      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={() => setSaved(true)}>
          Сохранить
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="error" onClick={() => navigate('/')}>
          Выйти
        </Button>
      </Stack>

      <Divider />
    </Stack>
  )
}