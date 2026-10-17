import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import { bookApi } from '@/entities/book'
import { diaryApi } from '@/entities/diary'
import { DiaryEntryForm } from '@/features/diary-entry-edit'
import { DiaryLog } from '@/features/diary-log'
import { isNotFoundError } from '@/shared/api'
import { routes } from '@/shared/config/routes'
import { useAsync } from '@/shared/lib'
import { AsyncView } from '@/shared/ui'
import NotFoundPage from './NotFoundPage'

export default function BookDiaryPage() {
  const { bookId = '' } = useParams()

  const loadPage = useCallback(async () => {
    const [book, entry] = await Promise.all([bookApi.getById(bookId), diaryApi.getEntry(bookId)])
    return { book, entry }
  }, [bookId])
  const { state, reload } = useAsync(loadPage)

  return (
    <AsyncView
      state={state}
      onRetry={reload}
      renderError={(error) => (isNotFoundError(error) ? <NotFoundPage /> : undefined)}
    >
      {({ book, entry }) => (
        <Stack spacing={3} sx={{ maxWidth: 700 }}>
          <Box>
            <Typography variant="h4">Дневник по книге</Typography>
            <Typography
              component={Link}
              to={routes.book(book.id)}
              sx={{ color: 'text.secondary', textDecoration: 'none' }}
            >
              {book.title}, {book.author}
            </Typography>
          </Box>

          <DiaryEntryForm bookId={book.id} entry={entry} />

          <DiaryLog bookId={book.id} />

          <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Button component={Link} to={routes.book(book.id)}>
              Назад к книге
            </Button>
            <Button component={Link} to={routes.diary}>
              Все записи дневника
            </Button>
          </Stack>
        </Stack>
      )}
    </AsyncView>
  )
}
