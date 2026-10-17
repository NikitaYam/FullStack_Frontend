import { useState } from 'react'
import { Box, Button, Collapse, FormHelperText, Paper, Rating, Stack, TextField, Typography } from '@mui/material'
import RateReviewIcon from '@mui/icons-material/RateReview'
import { reviewApi } from '@/entities/review'
import type { Review } from '@/entities/review'
import { useForm, validateText } from '@/shared/lib'
import type { FormErrors } from '@/shared/lib'
import { FormAlert } from '@/shared/ui'

const TEXT_MAX_LENGTH = 2000

interface ReviewFormValues {
  rating: number | null
  text: string
}

function validate(values: ReviewFormValues): FormErrors<ReviewFormValues> {
  const errors: FormErrors<ReviewFormValues> = {}
  if (!values.rating) errors.rating = 'Поставьте оценку от 1 до 5'
  const textError = validateText(values.text, { min: 10, max: TEXT_MAX_LENGTH })
  if (textError) errors.text = textError
  return errors
}

interface ReviewFormProps {
  bookId: string
  onCreated: (review: Review) => void
}

export function ReviewForm({ bookId, onCreated }: ReviewFormProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<ReviewFormValues>({
    initialValues: { rating: null, text: '' },
    validate,
    onSubmit: async ({ rating, text }) => {
      const review = await reviewApi.create({ bookId, rating: rating ?? 0, text })
      onCreated(review)
      form.reset()
      setOpen(false)
    },
  })

  const close = () => {
    form.reset()
    setOpen(false)
  }

  const ratingError = form.fieldError('rating')

  return (
    <Box>
      <Collapse in={!open}>
        <Button variant="outlined" startIcon={<RateReviewIcon />} onClick={() => setOpen(true)}>
          Написать отзыв
        </Button>
      </Collapse>

      {/* Форма плавно раскрывается по кнопке и сворачивается после публикации */}
      <Collapse in={open}>
        <Paper component="form" noValidate onSubmit={form.handleSubmit} sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Typography variant="subtitle1">Ваш отзыв</Typography>
            <Box>
              <Rating
                value={form.values.rating}
                onChange={(_event, value) => form.setValue('rating', value)}
                onBlur={() => form.touch('rating')}
              />
              {ratingError && <FormHelperText error>{ratingError}</FormHelperText>}
            </Box>
            <TextField
              label="Что вы думаете о книге?"
              multiline
              minRows={3}
              {...form.textFieldProps('text', `${form.values.text.trim().length} / ${TEXT_MAX_LENGTH}`)}
            />
            <FormAlert message={form.submitError} />
            <Stack direction="row" spacing={1}>
              <Button type="submit" variant="contained" loading={form.isSubmitting}>
                Опубликовать
              </Button>
              <Button onClick={close} disabled={form.isSubmitting}>
                Отмена
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Collapse>
    </Box>
  )
}
