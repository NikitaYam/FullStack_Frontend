import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar, Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import NotFoundPage from './NotFoundPage'
import { getChat, getUser } from '../data/mock'
import type { Message } from '../types'

export default function ChatPage() {
  const { userId } = useParams()
  const user = getUser(userId ?? '')
  const existingChat = getChat(userId ?? '')

  const [messages, setMessages] = useState<Message[]>(existingChat?.messages ?? [])
  const [text, setText] = useState('')

  if (!user) return <NotFoundPage />

  const handleSend = () => {
    if (text.trim() === '') return
    const newMessage: Message = {
      id: `my-${messages.length}`,
      fromMe: true,
      text: text.trim(),
    }
    setMessages([...messages, newMessage])
    setText('')
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: 560, height: '75vh' }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
        <Avatar>{user.name.charAt(0)}</Avatar>
        <Typography
          component={Link}
          to={`/profile/${user.id}`}
          variant="h6"
          sx={{ color: 'inherit', textDecoration: 'none' }}
        >
          {user.name}
        </Typography>
      </Stack>

      <Paper
        variant="outlined"
        sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}
      >
        {messages.length === 0 && (
          <Typography color="text.secondary">Сообщений пока нет. Напишите первым!</Typography>
        )}
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{
              alignSelf: message.fromMe ? 'flex-end' : 'flex-start',
              bgcolor: message.fromMe ? 'primary.main' : 'grey.200',
              color: message.fromMe ? 'primary.contrastText' : 'text.primary',
              borderRadius: 2,
              px: 2,
              py: 1,
              maxWidth: '75%',
            }}
          >
            <Typography variant="body2">{message.text}</Typography>
          </Box>
        ))}
      </Paper>

      <Stack direction="row" spacing={1}>
        <TextField
          label="Сообщение"
          size="small"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleSend()
          }}
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" onClick={handleSend}>
          Отправить
        </Button>
      </Stack>
    </Stack>
  )
}