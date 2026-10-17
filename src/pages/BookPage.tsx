import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Button, Chip, Divider, Rating, Stack, Typography } from '@mui/material'
import { BookCover, bookApi } from '@/entities/book'
import { ReviewCard, reviewApi } from '@/entities/review'
import { ReviewForm } from '@/features/review-create'
import { isNotFoundError } from '@/shared/api'
import { routes } from '@/shared/config/routes'
import { pluralize, useAsync } from '@/shared/lib'
import { AnimatedList, AsyncView, EmptyState } from '@/shared/ui'
import NotFoundPage from './NotFoundPage'

export default function BookPage() {
  const { bookId = '' } = useParams()

  const loadPage = useCallback(async () => {
    const [book, reviews] = await Promise.all([bookApi.getById(bookId), reviewApi.getByBook(bookId)])
    return { book, reviews }
  }, [bookId])
  const { state, reload, setData } = useAsync(loadPage)

  return (
    <AsyncView
      state={state}
      onRetry={reload}
      renderError={(error) => (isNotFoundError(error) ? <NotFoundPage /> : undefined)}
    >
      {({ book, reviews }) => (
        <Stack spacing={4}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
            <BookCover
              book={book}
              letterVariant="h1"
              sx={{ width: { xs: '100%', sm: 220 }, height: 300, flexShrink: 0, borderRadius: 2 }}
            />

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
                <Button variant="contained" component={Link} to={routes.bookReader(book.id)}>
                  Читать
                </Button>
                <Button variant="outlined" component={Link} to={routes.bookDiary(book.id)}>
                  В дневник
                </Button>
                <Button component={Link} to={routes.assistant}>
                  Спросить ИИ
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Typography variant="h5">
              Отзывы читателей
              {reviews.length > 0 && (
                <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
                  {reviews.length} {pluralize(reviews.length, ['отзыв', 'отзыва', 'отзывов'])}
                </Typography>
              )}
            </Typography>

            <ReviewForm
              bookId={book.id}
              onCreated={(review) => setData((prev) => ({ ...prev, reviews: [review, ...prev.reviews] }))}
            />

            {reviews.length === 0 && <EmptyState title="Отзывов пока нет" description="Будьте первым!" />}
            <Box>
              <AnimatedList
                items={reviews}
                getKey={(review) => review.id}
                renderItem={(review) => <ReviewCard review={review} />}
              />
            </Box>
          </Stack>
        </Stack>
      )}
    </AsyncView>
  )
}
