import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { BookCard, BookGrid, BookGridSkeleton, bookApi } from '@/entities/book'
import { routes } from '@/shared/config/routes'
import { useAsync } from '@/shared/lib'
import { AsyncView, EmptyState } from '@/shared/ui'

export default function BookMarketPage() {
  const { state, reload } = useAsync(bookApi.getAll)

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Библиотека</Typography>
        <Button component={Link} to={routes.assistant}>
          Что почитать?
        </Button>
      </Stack>

      <AsyncView
        state={state}
        onRetry={reload}
        loading={<BookGridSkeleton count={8} />}
        isEmpty={(books) => books.length === 0}
        empty={<EmptyState title="Каталог пока пуст" />}
      >
        {(books) => (
          <BookGrid>
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </BookGrid>
        )}
      </AsyncView>
    </Stack>
  )
}
