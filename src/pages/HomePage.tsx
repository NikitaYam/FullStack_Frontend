import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'
import BookGrid from '../components/BookGrid'
import { books, currentUserId, diary, getBook, getUser } from '../data/mock'

export default function HomePage() {
  const user = getUser(currentUserId)
  const readingEntries = diary.filter((entry) => entry.status === 'reading')
  const recommended = books
    .filter((book) => !diary.some((entry) => entry.bookId === book.id))
    .slice(0, 4)

  return (
    <Stack spacing={4}>
      <Typography variant="h4">Добро пожаловать, {user?.name}!</Typography>

      <Box>
        <Typography variant="h5" gutterBottom>
          Продолжить чтение
        </Typography>
        {readingEntries.length === 0 ? (
          <Typography color="text.secondary">Вы пока ничего не читаете.</Typography>
        ) : (
          <BookGrid>
            {readingEntries.map((entry) => {
              const book = getBook(entry.bookId)
              if (!book) return null
              return (
                <BookCard key={book.id} book={book}>
                  <LinearProgress variant="determinate" value={entry.progress} sx={{ mb: 1 }} />
                  <Button
                    fullWidth
                    variant="contained"
                    component={Link}
                    to={`/books/${book.id}/read`}
                  >
                    Читать ({entry.progress}%)
                  </Button>
                </BookCard>
              )
            })}
          </BookGrid>
        )}
      </Box>

      <Box>
        <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h5">Рекомендации ИИ</Typography>
          <Button component={Link} to="/assistant">
            Спросить ассистента
          </Button>
        </Stack>
        <BookGrid>
          {recommended.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </BookGrid>
      </Box>

      {/* <Box>
        <Typography variant="h5" gutterBottom>
          Быстрый доступ
        </Typography>
        <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
          <Button variant="outlined" component={Link} to="/library">
            Библиотека
          </Button>
          <Button variant="outlined" component={Link} to="/market">
            Магазин книг
          </Button>
          <Button variant="outlined" component={Link} to="/social">
            Лента
          </Button>
          <Button variant="outlined" component={Link} to="/chats">
            Чаты
          </Button>
        </Stack>
      </Box> */}
    </Stack>
  )
}