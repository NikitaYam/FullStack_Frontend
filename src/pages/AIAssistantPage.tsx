import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import BookCard from '../components/BookCard'
import BookGrid from '../components/BookGrid'
import { books, currentUserId, diary, getUser } from '../data/mock'
import type { Book } from '../types'

interface AssistantMessage {
  id: string
  fromAssistant: boolean
  text: string
  books?: Book[]
}

function recommendByGenre(): Book[] {
  const user = getUser(currentUserId)
  if (!user) return books.slice(0, 3)
  return books.filter((book) => user.favoriteGenres.includes(book.genre)).slice(0, 3)
}

function recommendByDiary(): Book[] {
  const readGenres = new Set(
    diary
      .map((entry) => books.find((book) => book.id === entry.bookId)?.genre)
      .filter((genre): genre is string => Boolean(genre)),
  )
  return books
    .filter((book) => readGenres.has(book.genre) && !diary.some((entry) => entry.bookId === book.id))
    .slice(0, 3)
}

const initialMessage: AssistantMessage = {
  id: 'start',
  fromAssistant: true,
  text: 'Привет! Я помогу подобрать книгу. Выберите вариант ниже или опишите, что хотите почитать.',
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<AssistantMessage[]>([initialMessage])
  const [text, setText] = useState('')

  const addAssistantReply = (replyText: string, recommendedBooks: Book[]) => {
    const reply: AssistantMessage = {
      id: `a-${messages.length}`,
      fromAssistant: true,
      text: replyText,
      books: recommendedBooks,
    }
    setMessages((prev) => [...prev, reply])
  }

  const handleQuickPrompt = (kind: 'genre' | 'diary') => {
    if (kind === 'genre') {
      addAssistantReply('Вот книги в ваших любимых жанрах:', recommendByGenre())
    } else {
      addAssistantReply('На основе вашего дневника советую попробовать:', recommendByDiary())
    }
  }

  const handleSend = () => {
    if (text.trim() === '') return
    const userMessage: AssistantMessage = {
      id: `u-${messages.length}`,
      fromAssistant: false,
      text: text.trim(),
    }
    setMessages((prev) => [...prev, userMessage])
    setText('')
    addAssistantReply('Хороший запрос! Пока я подбираю ответы по демо-правилам, вот что нашлось:', recommendByGenre())
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: 700 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <SmartToyIcon color="primary" />
        <Typography variant="h4">ИИ-ассистент</Typography>
      </Stack>

      <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Button variant="outlined" onClick={() => handleQuickPrompt('genre')}>
          По любимым жанрам
        </Button>
        <Button variant="outlined" onClick={() => handleQuickPrompt('diary')}>
          На основе дневника
        </Button>
      </Stack>

      <Stack spacing={2}>
        {messages.map((message) => (
          <Paper
            key={message.id}
            sx={{
              p: 2,
              alignSelf: message.fromAssistant ? 'flex-start' : 'flex-end',
              bgcolor: message.fromAssistant ? 'grey.100' : 'primary.main',
              color: message.fromAssistant ? 'text.primary' : 'primary.contrastText',
              maxWidth: '90%',
            }}
          >
            <Typography>{message.text}</Typography>
            {message.books && message.books.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <BookGrid>
                  {message.books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </BookGrid>
              </Box>
            )}
            {message.books && message.books.length === 0 && (
              <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                Подходящих книг не нашлось, загляните в{' '}
                <Box component={Link} to="/library" sx={{ color: 'inherit' }}>
                  библиотеку
                </Box>
                .
              </Typography>
            )}
          </Paper>
        ))}
      </Stack>

      <Stack direction="row" spacing={1}>
        <TextField
          label="Опишите, что хотите почитать"
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