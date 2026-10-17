import { Box, Button, LinearProgress, Skeleton, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { BookCard, BookGrid, BookGridSkeleton } from '@/entities/book'
import { loadRecommendationContext, recommendForUser } from '@/features/recommendations'
import { routes } from '@/shared/config/routes'
import { useAsync } from '@/shared/lib'
import { AsyncView, EmptyState } from '@/shared/ui'

function HomeSkeleton() {
  return (
    <Stack spacing={4}>
      <Skeleton variant="text" width={320} height={48} />
      <BookGridSkeleton count={2} />
      <BookGridSkeleton />
    </Stack>
  )
}

export default function HomePage() {
  const { state, reload } = useAsync(loadRecommendationContext)

  return (
    <AsyncView state={state} onRetry={reload} loading={<HomeSkeleton />}>
      {(context) => {
        const reading = context.entries.filter((entry) => entry.status === 'reading')
        const recommended = recommendForUser(context, 4)

        return (
          <Stack spacing={4}>
            <Typography variant="h4">Добро пожаловать, {context.user.name}!</Typography>

            <Box>
              <Typography variant="h5" gutterBottom>
                Продолжить чтение
              </Typography>
              {reading.length === 0 ? (
                <EmptyState
                  title="Вы пока ничего не читаете"
                  description="Выберите книгу в библиотеке и отметьте её в дневнике."
                  action={
                    <Button variant="outlined" component={Link} to={routes.market}>
                      В библиотеку
                    </Button>
                  }
                />
              ) : (
                <BookGrid>
                  {reading.map((entry) => {
                    const book = context.books.find((item) => item.id === entry.book.id)
                    if (!book) return null
                    return (
                      <BookCard key={book.id} book={book}>
                        <LinearProgress variant="determinate" value={entry.progress} sx={{ mb: 1 }} />
                        <Button fullWidth variant="contained" component={Link} to={routes.bookReader(book.id)}>
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
                <Button component={Link} to={routes.assistant}>
                  Спросить ассистента
                </Button>
              </Stack>
              {recommended.length === 0 ? (
                <EmptyState title="Вы прочитали всё, что у нас есть!" />
              ) : (
                <BookGrid>
                  {recommended.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </BookGrid>
              )}
            </Box>
          </Stack>
        )
      }}
    </AsyncView>
  )
}
