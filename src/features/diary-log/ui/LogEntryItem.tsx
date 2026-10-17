import { useState } from 'react'
import { Box, Button, IconButton, Paper, Stack, TextField, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { diaryApi } from '@/entities/diary'
import type { DiaryLogEntry } from '@/entities/diary'
import { formatDate, toError, useForm } from '@/shared/lib'
import { FormAlert } from '@/shared/ui'
import { validateLogEntry } from '../model/validation'

interface LogEntryItemProps {
  entry: DiaryLogEntry
  onUpdated: (entry: DiaryLogEntry) => void
  onDeleted: (id: string) => void
}

/** Заметка дневника: просмотр, редактирование на месте и удаление */
export function LogEntryItem({ entry, onUpdated, onDeleted }: LogEntryItemProps) {
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const form = useForm({
    initialValues: { text: entry.text },
    validate: validateLogEntry,
    onSubmit: async ({ text }) => {
      const updated = await diaryApi.updateLog(entry.id, text)
      onUpdated(updated)
      form.reset({ text: updated.text })
      setEditing(false)
    },
  })

  const cancelEdit = () => {
    form.reset()
    setEditing(false)
  }

  const handleDelete = async () => {
    setDeleting(true)
    setDeleteError(null)
    try {
      await diaryApi.deleteLog(entry.id)
      onDeleted(entry.id)
    } catch (error) {
      setDeleteError(toError(error).message)
      setDeleting(false)
    }
  }

  return (
    <Paper sx={{ p: 2, opacity: deleting ? 0.5 : 1, transition: 'opacity 0.2s' }}>
      <Typography variant="caption" color="text.secondary">
        {formatDate(entry.date)}
      </Typography>

      {editing ? (
        <Stack component="form" noValidate spacing={1} onSubmit={form.handleSubmit} sx={{ mt: 1 }}>
          <TextField label="Редактирование записи" multiline minRows={2} autoFocus {...form.textFieldProps('text')} />
          <FormAlert message={form.submitError} />
          <Stack direction="row" spacing={1}>
            <Button type="submit" variant="contained" size="small" loading={form.isSubmitting} disabled={!form.isDirty}>
              Сохранить
            </Button>
            <Button size="small" onClick={cancelEdit} disabled={form.isSubmitting}>
              Отмена
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
          <Typography sx={{ flexGrow: 1, whiteSpace: 'pre-line' }}>{entry.text}</Typography>
          <Box sx={{ flexShrink: 0 }}>
            <Tooltip title="Редактировать">
              <IconButton size="small" onClick={() => setEditing(true)} disabled={deleting}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Удалить">
              <IconButton size="small" onClick={handleDelete} disabled={deleting}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      )}

      <FormAlert message={deleteError} onClose={() => setDeleteError(null)} sx={{ mt: 1 }} />
    </Paper>
  )
}
