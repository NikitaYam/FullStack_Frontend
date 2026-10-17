import { useState } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { BookCard, BookGrid, BookGridSkeleton, bookApi } from '@/entities/book'
import { BookFilters, defaultBookFilter, filterBooks, getGenres, isFilterActive } from '@/features/book-filter'
import { routes } from '@/shared/config/routes'
import { pluralize, useAsync } from '@/shared/lib'
import { AsyncView, EmptyState } from '@/shared/ui'

export default function LibraryPage() {
  const { state, reload } = useAsync(bookApi.getAll)
  const [filter, setFilter] = useState(defaultBookFilter)

  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Книжная полка</Typography>
        <Button component={Link} to={routes.assistant}>
          Что почитать?
        </Button>
      </Stack>

      <AsyncView
        state={state}
        onRetry={reload}
        loading={<BookGridSkeleton count={8} />}
        isEmpty={(books) => books.length === 0}
        empty={<EmptyState title="Полка пуста" description="Книги появятся здесь после добавления в каталог." />}
      >
        {(books) => {
          const filtered = filterBooks(books, filter)
          return (
            <Stack spacing={3}>
              <BookFilters value={filter} onChange={setFilter} genres={getGenres(books)} />

              {isFilterActive(filter) && (
                <Typography variant="body2" color="text.secondary">
                  Найдено {filtered.length} {pluralize(filtered.length, ['книга', 'книги', 'книг'])}
                </Typography>
              )}

              {filtered.length === 0 ? (
                <EmptyState
                  title="Ничего не найдено"
                  description="Попробуйте изменить запрос или выбрать другой жанр."
                  action={
                    <Button variant="outlined" onClick={() => setFilter(defaultBookFilter)}>
                      Сбросить фильтры
                    </Button>
                  }
                />
              ) : (
                <BookGrid>
                  {filtered.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </BookGrid>
              )}
            </Stack>
          )
        }}
      </AsyncView>
    </Stack>
  )
}
