import { useState } from 'react'
import {
  Box,
  Button,
  Collapse,
  FormHelperText,
  MenuItem,
  Paper,
  Rating,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { diaryApi, readingStatuses, statusLabels } from '@/entities/diary'
import type { DiaryEntry, DiaryEntryUpdate, ReadingStatus } from '@/entities/diary'
import { useForm } from '@/shared/lib'
import type { FormErrors } from '@/shared/lib'
import { FormAlert } from '@/shared/ui'

function validate(values: DiaryEntryUpdate): FormErrors<DiaryEntryUpdate> {
  const errors: FormErrors<DiaryEntryUpdate> = {}
  if (values.status === 'done' && !values.rating) errors.rating = 'Оцените прочитанную книгу'
  return errors
}

// Прогресс согласуется со статусом: «хочу почитать» — 0%, «прочитано» — 100%
function progressForStatus(status: ReadingStatus, progress: number): number {
  if (status === 'want') return 0
  if (status === 'done') return 100
  return progress === 100 ? 0 : progress
}

interface DiaryEntryFormProps {
  bookId: string
  entry: DiaryEntry | null
}

export function DiaryEntryForm({ bookId, entry }: DiaryEntryFormProps) {
  const [inDiary, setInDiary] = useState(entry !== null)
  const [savedMessage, setSavedMessage] = useState<string | null>(null)

  const form = useForm<DiaryEntryUpdate>({
    initialValues: {
      status: entry?.status ?? 'want',
      progress: entry?.progress ?? 0,
      rating: entry?.rating ?? null,
    },
    validate,
    onSubmit: async (values) => {
      const saved = await diaryApi.saveEntry(bookId, values)
      form.reset({ status: saved.status, progress: saved.progress, rating: saved.rating })
      setSavedMessage(inDiary ? 'Изменения сохранены' : 'Книга добавлена в дневник')
      setInDiary(true)
    },
  })

  const { status, progress, rating } = form.values
  const ratingError = form.fieldError('rating')

  const changeStatus = (nextStatus: ReadingStatus) => {
    form.setValue('status', nextStatus)
    form.setValue('progress', progressForStatus(nextStatus, progress))
    setSavedMessage(null)
  }

  return (
    <Paper component="form" noValidate onSubmit={form.handleSubmit} sx={{ p: 3 }}>
      <Stack spacing={2}>
        <TextField
          select
          label="Статус"
          value={status}
          onChange={(event) => changeStatus(event.target.value as ReadingStatus)}
          sx={{ maxWidth: 260 }}
        >
          {readingStatuses.map((key) => (
            <MenuItem key={key} value={key}>
              {statusLabels[key]}
            </MenuItem>
          ))}
        </TextField>

        {/* Ползунок прогресса нужен только для книги, которую читают сейчас */}
        <Collapse in={status === 'reading'} unmountOnExit>
          <Box sx={{ maxWidth: 360 }}>
            <Typography variant="body2">Прочитано: {progress}%</Typography>
            <Slider
              value={progress}
              step={5}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              onChange={(_event, value) => form.setValue('progress', value)}
            />
          </Box>
        </Collapse>

        <Box>
          <Typography component="legend" variant="body2">
            Ваша оценка
          </Typography>
          <Rating value={rating} onChange={(_event, value) => form.setValue('rating', value)} />
          {ratingError && <FormHelperText error>{ratingError}</FormHelperText>}
        </Box>

        <FormAlert message={form.submitError} />
        <FormAlert
          severity="success"
          message={form.isDirty ? null : savedMessage}
          onClose={() => setSavedMessage(null)}
        />

        <Box>
          <Button type="submit" variant="contained" loading={form.isSubmitting} disabled={inDiary && !form.isDirty}>
            {inDiary ? 'Сохранить статус и оценку' : 'Добавить в дневник'}
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}
