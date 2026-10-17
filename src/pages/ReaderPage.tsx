import { useCallback, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Button, Fade, LinearProgress, MenuItem, Paper, Stack, TextField, Typography } from '@mui/material'
import { bookApi } from '@/entities/book'
import { ReaderSettingsPanel, readerThemes, useReaderSettings } from '@/features/reader-settings'
import { isNotFoundError } from '@/shared/api'
import { routes } from '@/shared/config/routes'
import { useAsync } from '@/shared/lib'
import { AsyncView } from '@/shared/ui'
import NotFoundPage from './NotFoundPage'

export default function ReaderPage() {
  const { bookId = '' } = useParams()
  const [chapterIndex, setChapterIndex] = useState(0)
  const [settings, setSettings] = useReaderSettings()

  const loadPage = useCallback(async () => {
    const [book, chapters] = await Promise.all([bookApi.getById(bookId), bookApi.getChapters(bookId)])
    return { book, chapters }
  }, [bookId])
  const { state, reload } = useAsync(loadPage)

  const colors = readerThemes[settings.theme]

  return (
    <AsyncView
      state={state}
      onRetry={reload}
      renderError={(error) => (isNotFoundError(error) ? <NotFoundPage /> : undefined)}
    >
      {({ book, chapters }) => {
        const chapter = chapters[chapterIndex]
        const progress = ((chapterIndex + 1) / chapters.length) * 100

        return (
          <Stack spacing={2}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}
            >
              <Typography variant="h5">{book.title}</Typography>
              <Stack direction="row" spacing={1}>
                <Button component={Link} to={routes.book(book.id)}>
                  К книге
                </Button>
                <Button variant="outlined" component={Link} to={routes.bookDiary(book.id)}>
                  Заметка в дневник
                </Button>
              </Stack>
            </Stack>

            <Paper sx={{ p: 2 }}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: { md: 'center' } }}>
                <TextField
                  select
                  label="Оглавление"
                  value={chapterIndex}
                  onChange={(event) => setChapterIndex(Number(event.target.value))}
                  sx={{ minWidth: 200 }}
                >
                  {chapters.map((item, index) => (
                    <MenuItem key={item.title} value={index}>
                      {item.title}
                    </MenuItem>
                  ))}
                </TextField>
                <ReaderSettingsPanel value={settings} onChange={setSettings} />
              </Stack>
            </Paper>

            <Paper
              sx={{
                p: { xs: 2, sm: 4 },
                bgcolor: colors.background,
                color: colors.color,
                fontSize: settings.fontSize,
                lineHeight: 1.8,
                transition: 'background-color 0.3s, color 0.3s',
              }}
            >
              {/* key по номеру главы: при перелистывании текст плавно проявляется */}
              <Fade key={chapterIndex} in timeout={400}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {chapter.title}
                  </Typography>
                  {chapter.paragraphs.map((paragraph, index) => (
                    <Typography key={index} variant="inherit" component="p" sx={{ mb: 2 }}>
                      {paragraph}
                    </Typography>
                  ))}
                </Box>
              </Fade>
              <Typography variant="caption" sx={{ opacity: 0.6 }}>
                Демонстрационный текст. Настоящий текст книги придёт с сервера.
              </Typography>
            </Paper>

            <Stack direction="row" spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                variant="outlined"
                disabled={chapterIndex === 0}
                onClick={() => setChapterIndex(chapterIndex - 1)}
              >
                Назад
              </Button>
              <Typography>
                Глава {chapterIndex + 1} из {chapters.length}
              </Typography>
              <Button
                variant="contained"
                disabled={chapterIndex === chapters.length - 1}
                onClick={() => setChapterIndex(chapterIndex + 1)}
              >
                Вперёд
              </Button>
            </Stack>
            <LinearProgress variant="determinate" value={progress} />
          </Stack>
        )
      }}
    </AsyncView>
  )
}
