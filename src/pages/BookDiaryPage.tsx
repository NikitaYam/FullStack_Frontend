import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import NotFoundPage from './NotFoundPage'
import { diary, getBook, getDiaryLogEntries, statusLabels } from '../data/mock'
import type { DiaryLogEntry, ReadingStatus } from '../types'

export default function BookDiaryPage() {
  const { bookId } = useParams()
  const book = getBook(bookId ?? '')
  const entry = diary.find((item) => item.bookId === bookId)

  const [status, setStatus] = useState<ReadingStatus>(entry?.status ?? 'want')
  const [rating, setRating] = useState(entry?.rating ?? 0)
  const [logEntries, setLogEntries] = useState<DiaryLogEntry[]>(getDiaryLogEntries(bookId ?? ''))
  const [newEntryText, setNewEntryText] = useState('')
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null)
  const [editingText, setEditingText] = useState('')
  const [saved, setSaved] = useState(false)

  if (!book) return <NotFoundPage />

  const handleAddEntry = () => {
    if (newEntryText.trim() === '') return
    const entryToAdd: DiaryLogEntry = {
      id: `my-${logEntries.length}`,
      bookId: book.id,
      date: 'Сегодня',
      text: newEntryText.trim(),
    }
    setLogEntries([entryToAdd, ...logEntries])
    setNewEntryText('')
  }

  const handleStartEdit = (logEntry: DiaryLogEntry) => {
    setEditingEntryId(logEntry.id)
    setEditingText(logEntry.text)
  }

  const handleCancelEdit = () => {
    setEditingEntryId(null)
    setEditingText('')
  }

  const handleSaveEdit = () => {
    if (editingText.trim() === '') return
    setLogEntries(
      logEntries.map((logEntry) =>
        logEntry.id === editingEntryId ? { ...logEntry, text: editingText.trim() } : logEntry,
      ),
    )
    setEditingEntryId(null)
    setEditingText('')
  }

  const handleDeleteEntry = (id: string) => {
    setLogEntries(logEntries.filter((logEntry) => logEntry.id !== id))
    if (editingEntryId === id) handleCancelEdit()
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 700 }}>
      <Box>
        <Typography variant="h4">Дневник по книге</Typography>
        <Typography
          component={Link}
          to={`/books/${book.id}`}
          sx={{ color: 'text.secondary', textDecoration: 'none' }}
        >
          {book.title}, {book.author}
        </Typography>
      </Box>

      <TextField
        select
        label="Статус"
        value={status}
        onChange={(event) => setStatus(event.target.value as ReadingStatus)}
        sx={{ maxWidth: 260 }}
      >
        {(Object.keys(statusLabels) as ReadingStatus[]).map((key) => (
          <MenuItem key={key} value={key}>
            {statusLabels[key]}
          </MenuItem>
        ))}
      </TextField>

      <Box>
        <Typography component="legend">Ваша оценка</Typography>
        <Rating value={rating} onChange={(_event, value) => setRating(value ?? 0)} />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Записи о чтении
        </Typography>

        {logEntries.length === 0 ? (
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Записей пока нет. Добавьте первую заметку ниже.
          </Typography>
        ) : (
          <Stack spacing={1} sx={{ mb: 2 }}>
            {logEntries.map((logEntry) =>
              editingEntryId === logEntry.id ? (
                <Paper key={logEntry.id} sx={{ p: 2 }}>
                  <Stack spacing={1}>
                    <TextField
                      label="Редактирование записи"
                      multiline
                      minRows={2}
                      value={editingText}
                      onChange={(event) => setEditingText(event.target.value)}
                      autoFocus
                    />
                    <Stack direction="row" spacing={1}>
                      <Button variant="contained" size="small" onClick={handleSaveEdit}>
                        Сохранить
                      </Button>
                      <Button size="small" onClick={handleCancelEdit}>
                        Отмена
                      </Button>
                    </Stack>
                  </Stack>
                </Paper>
              ) : (
                <Paper key={logEntry.id} sx={{ p: 2 }}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="caption" color="text.secondary">
                        {logEntry.date}
                      </Typography>
                      <Typography>{logEntry.text}</Typography>
                    </Box>
                    <IconButton size="small" onClick={() => handleStartEdit(logEntry)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteEntry(logEntry.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Paper>
              ),
            )}
          </Stack>
        )}

        <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
          <TextField
            label="Новая запись"
            multiline
            minRows={2}
            value={newEntryText}
            onChange={(event) => setNewEntryText(event.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button variant="contained" onClick={handleAddEntry}>
            Добавить
          </Button>
        </Stack>
      </Box>

      {saved && (
        <Alert severity="success" onClose={() => setSaved(false)}>
          Запись сохранена (пока только в демо-режиме).
        </Alert>
      )}

      <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
        <Button variant="contained" onClick={() => setSaved(true)}>
          Сохранить статус и оценку
        </Button>
        <Button component={Link} to={`/books/${book.id}`}>
          Назад к книге
        </Button>
        <Button component={Link} to="/diary">
          Все записи дневника
        </Button>
      </Stack>
    </Stack>
  )
}