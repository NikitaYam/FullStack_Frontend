import { Button, Stack, TextField } from '@mui/material'
import { diaryApi } from '@/entities/diary'
import type { DiaryLogEntry } from '@/entities/diary'
import { useForm } from '@/shared/lib'
import { FormAlert } from '@/shared/ui'
import { validateLogEntry } from '../model/validation'

interface NewLogEntryFormProps {
  bookId: string
  onCreated: (entry: DiaryLogEntry) => void
}

export function NewLogEntryForm({ bookId, onCreated }: NewLogEntryFormProps) {
  const form = useForm({
    initialValues: { text: '' },
    validate: validateLogEntry,
    onSubmit: async ({ text }) => {
      onCreated(await diaryApi.addLog(bookId, text))
      form.reset()
    },
  })

  return (
    <Stack component="form" noValidate spacing={1} onSubmit={form.handleSubmit}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
        <TextField
          label="Новая запись"
          placeholder="Что запомнилось сегодня?"
          multiline
          minRows={2}
          sx={{ flexGrow: 1 }}
          {...form.textFieldProps('text')}
        />
        <Button type="submit" variant="contained" loading={form.isSubmitting}>
          Добавить
        </Button>
      </Stack>
      <FormAlert message={form.submitError} />
    </Stack>
  )
}
