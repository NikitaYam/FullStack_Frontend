import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Button,
  LinearProgress,
  MenuItem,
  Paper,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import NotFoundPage from './NotFoundPage'
import { chapters, getBook } from '../data/mock'

type ReaderTheme = 'light' | 'dark' | 'sepia'

const readerThemes: Record<ReaderTheme, { label: string; background: string; color: string }> = {
  light: { label: 'Светлая', background: '#ffffff', color: '#222222' },
  dark: { label: 'Тёмная', background: '#1e1e1e', color: '#dddddd' },
  sepia: { label: 'Сепия', background: '#f4ecd8', color: '#5b4636' },
}

export default function ReaderPage() {
  const { bookId } = useParams()
  const book = getBook(bookId ?? '')

  const [chapterIndex, setChapterIndex] = useState(0)
  const [fontSize, setFontSize] = useState(18)
  const [theme, setTheme] = useState<ReaderTheme>('light')

  if (!book) return <NotFoundPage />

  const chapter = chapters[chapterIndex]
  const progress = ((chapterIndex + 1) / chapters.length) * 100
  const colors = readerThemes[theme]

  return (
    <Stack spacing={2}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">{book.title}</Typography>
        <Stack direction="row" spacing={1}>
          <Button component={Link} to={`/books/${book.id}`}>
            К книге
          </Button>
          <Button variant="outlined" component={Link} to={`/books/${book.id}/diary`}>
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

          <Stack sx={{ minWidth: 200 }}>
            <Typography variant="body2">Размер шрифта: {fontSize}px</Typography>
            <Slider
              min={14}
              max={28}
              value={fontSize}
              onChange={(_event, value) => {
                if (typeof value === 'number') setFontSize(value)
              }}
            />
          </Stack>

          <ToggleButtonGroup
            exclusive
            value={theme}
            onChange={(_event, value: ReaderTheme | null) => {
              if (value) setTheme(value)
            }}
          >
            {(Object.keys(readerThemes) as ReaderTheme[]).map((key) => (
              <ToggleButton key={key} value={key}>
                {readerThemes[key].label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
      </Paper>

      <Paper
        sx={{
          p: { xs: 2, sm: 4 },
          bgcolor: colors.background,
          color: colors.color,
          fontSize,
          lineHeight: 1.8,
        }}
      >
        <Typography variant="h5" gutterBottom>
          {chapter.title}
        </Typography>
        {chapter.paragraphs.map((paragraph, index) => (
          <Typography key={index} variant="inherit" component="p" sx={{ mb: 2 }}>
            {paragraph}
          </Typography>
        ))}
        <Typography variant="caption" sx={{ opacity: 0.6 }}>
          Демонстрационный текст. Настоящий текст книги придёт с сервера.
        </Typography>
      </Paper>

      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }} spacing={2}>
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
}