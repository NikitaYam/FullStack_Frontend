import { Box, Button, Paper, Stack, TextField } from '@mui/material'
import { postApi } from '@/entities/post'
import type { Post } from '@/entities/post'
import { useForm, validateText } from '@/shared/lib'
import { FormAlert } from '@/shared/ui'

const POST_MAX_LENGTH = 1000

interface CreatePostFormProps {
  onCreated: (post: Post) => void
}

export function CreatePostForm({ onCreated }: CreatePostFormProps) {
  const form = useForm({
    initialValues: { text: '' },
    validate: ({ text }) => {
      const textError = validateText(text, { min: 3, max: POST_MAX_LENGTH })
      return textError ? { text: textError } : {}
    },
    onSubmit: async ({ text }) => {
      onCreated(await postApi.create(text))
      form.reset()
    },
  })

  const length = form.values.text.trim().length

  return (
    <Paper component="form" noValidate onSubmit={form.handleSubmit} sx={{ p: 2 }}>
      <Stack spacing={2}>
        <TextField
          label="Что вы читаете или думаете?"
          multiline
          minRows={2}
          {...form.textFieldProps('text', `${length} / ${POST_MAX_LENGTH}`)}
        />
        <FormAlert message={form.submitError} />
        <Box>
          <Button type="submit" variant="contained" loading={form.isSubmitting}>
            Опубликовать
          </Button>
        </Box>
      </Stack>
    </Paper>
  )
}
