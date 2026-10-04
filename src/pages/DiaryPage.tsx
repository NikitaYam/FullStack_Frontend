import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Chip,
  LinearProgress,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { diary, getBook, statusLabels } from '../data/mock'
import type { ReadingStatus } from '../types'

type StatusFilter = ReadingStatus | 'all'

export default function DiaryPage() {
  const [filter, setFilter] = useState<StatusFilter>('all')

  const entries = diary.filter((entry) => filter === 'all' || entry.status === filter)

  return (
    <Stack spacing={3} sx={{ maxWidth: 640 }}>
      <Typography variant="h4">Дневник чтения</Typography>

      <TextField
        select
        label="Статус"
        value={filter}
        onChange={(event) => setFilter(event.target.value as StatusFilter)}
        sx={{ maxWidth: 260 }}
      >
        <MenuItem value="all">Все книги</MenuItem>
        {(Object.keys(statusLabels) as ReadingStatus[]).map((key) => (
          <MenuItem key={key} value={key}>
            {statusLabels[key]}
          </MenuItem>
        ))}
      </TextField>

      {entries.length === 0 ? (
        <Typography color="text.secondary">
          Записей пока нет. Откройте книгу и нажмите «В дневник».
        </Typography>
      ) : (
        <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
          {entries.map((entry) => {
            const book = getBook(entry.bookId)
            if (!book) return null
            return (
              <ListItemButton key={entry.bookId} component={Link} to={`/books/${book.id}/diary`} divider>
                <ListItemAvatar>
                  <Avatar variant="rounded" sx={{ bgcolor: book.color }}>
                    {book.title.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={book.title} secondary={book.author} sx={{ mr: 2 }} />
                <Stack spacing={0.5} sx={{ minWidth: 150, alignItems: 'flex-end' }}>
                  <Chip label={statusLabels[entry.status]} size="small" />
                  {entry.status === 'reading' && (
                    <Box sx={{ width: '100%' }}>
                      <LinearProgress variant="determinate" value={entry.progress} />
                    </Box>
                  )}
                  {entry.rating > 0 && <Rating value={entry.rating} readOnly size="small" />}
                </Stack>
              </ListItemButton>
            )
          })}
        </List>
      )}
    </Stack>
  )
}