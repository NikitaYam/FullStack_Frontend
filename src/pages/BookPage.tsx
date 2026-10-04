import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import NotFoundPage from './NotFoundPage'
import { currentUserId, getBook, getUser, reviews } from '../data/mock'
import type { Review } from '../types'

export default function BookPage() {
  const { bookId } = useParams()
  const book = getBook(bookId ?? '')

  const [myReviews, setMyReviews] = useState<Review[]>([])
  const [rating, setRating] = useState(0)
  const [text, setText] = useState('')

  if (!book) return <NotFoundPage />

  const bookReviews = [...myReviews, ...reviews].filter((review) => review.bookId === book.id)

  const handleAddReview = () => {
    if (text.trim() === '') return
    const newReview: Review = {
      id: `my-${myReviews.length}`,
      bookId: book.id,
      authorId: currentUserId,
      rating,
      text: text.trim(),
    }
    setMyReviews([newReview, ...myReviews])
    setText('')
    setRating(0)
  }

  return (
    <Stack spacing={4}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
        <Box
          sx={{
            width: { xs: '100%', sm: 220 },
            height: 300,
            flexShrink: 0,
            bgcolor: book.color,
            color: '#fff',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h1">{book.title.charAt(0)}</Typography>
        </Box>

        <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Typography variant="h4">{book.title}</Typography>
          <Typography variant="h6" color="text.secondary">
            {book.author}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Chip label={book.genre} />
            <Chip label={`${book.year} г.`} variant="outlined" />
          </Stack>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Rating value={book.rating} precision={0.1} readOnly />
            <Typography>{book.rating}</Typography>
          </Stack>
          <Typography>{book.description}</Typography>
          <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Button variant="contained" component={Link} to={`/books/${book.id}/read`}>
              Читать
            </Button>
            <Button variant="outlined" component={Link} to={`/books/${book.id}/diary`}>
              В дневник
            </Button>
            <Button component={Link} to="/assistant">
              Спросить ИИ
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <Divider />

      <Box>
        <Typography variant="h5" gutterBottom>
          Отзывы читателей
        </Typography>

        <Paper sx={{ p: 2, mb: 3 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Оставить отзыв</Typography>
            <Rating value={rating} onChange={(_event, value) => setRating(value ?? 0)} />
            <TextField
              label="Ваш отзыв"
              multiline
              minRows={3}
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <Box>
              <Button variant="contained" onClick={handleAddReview}>
                Опубликовать
              </Button>
            </Box>
          </Stack>
        </Paper>

        <Stack spacing={2}>
          {bookReviews.length === 0 && (
            <Typography color="text.secondary">Отзывов пока нет. Будьте первым!</Typography>
          )}
          {bookReviews.map((review) => {
            const author = getUser(review.authorId)
            return (
              <Paper key={review.id} sx={{ p: 2 }}>
                <Stack direction="row" spacing={2}>
                  <Avatar>{author?.name.charAt(0)}</Avatar>
                  <Box>
                    <Typography
                      component={Link}
                      to={`/profile/${review.authorId}`}
                      sx={{ color: 'inherit', fontWeight: 600, textDecoration: 'none' }}
                    >
                      {author?.name}
                    </Typography>
                    <Box>
                      <Rating value={review.rating} readOnly size="small" />
                    </Box>
                    <Typography>{review.text}</Typography>
                  </Box>
                </Stack>
              </Paper>
            )
          })}
        </Stack>
      </Box>
    </Stack>
  )
}