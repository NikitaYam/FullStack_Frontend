import { useState } from 'react'
import {
  Button,
  FormControlLabel,
  Paper,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { userApi } from '@/entities/user'
import type { AccountSettings } from '@/entities/user'
import { isEmail, useForm, validateText } from '@/shared/lib'
import type { FormErrors } from '@/shared/lib'
import { FormAlert } from '@/shared/ui'

const BIO_MAX_LENGTH = 300

function validate(values: AccountSettings): FormErrors<AccountSettings> {
  const errors: FormErrors<AccountSettings> = {}
  const nameError = validateText(values.name, { min: 2, max: 30 })
  if (nameError) errors.name = nameError
  const bioError = validateText(values.bio, { required: false, max: BIO_MAX_LENGTH })
  if (bioError) errors.bio = bioError
  if (values.email.trim() === '') errors.email = 'Введите email'
  else if (!isEmail(values.email)) errors.email = 'Некорректный email'
  return errors
}

type SwitchField = 'notifyMessages' | 'notifyRecommendations' | 'publicDiary'

interface AccountSettingsFormProps {
  initialSettings: AccountSettings
}

export function AccountSettingsForm({ initialSettings }: AccountSettingsFormProps) {
  const [savedOpen, setSavedOpen] = useState(false)

  const form = useForm({
    initialValues: initialSettings,
    validate,
    onSubmit: async (values) => {
      form.reset(await userApi.updateSettings(values))
      setSavedOpen(true)
    },
  })

  const switchControl = (name: SwitchField, label: string) => (
    <FormControlLabel
      control={
        <Switch checked={form.values[name]} onChange={(event) => form.setValue(name, event.target.checked)} />
      }
      label={label}
    />
  )

  return (
    <Stack component="form" noValidate spacing={3} onSubmit={form.handleSubmit}>
      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Typography variant="h6">Аккаунт</Typography>
          <TextField label="Имя" required {...form.textFieldProps('name')} />
          <TextField
            label="О себе"
            multiline
            minRows={2}
            {...form.textFieldProps('bio', `${form.values.bio.trim().length} / ${BIO_MAX_LENGTH}`)}
          />
          <TextField label="Email" type="email" required {...form.textFieldProps('email')} />
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h6">Уведомления</Typography>
          {switchControl('notifyMessages', 'Новые сообщения')}
          {switchControl('notifyRecommendations', 'Рекомендации ИИ-ассистента')}
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={1}>
          <Typography variant="h6">Приватность</Typography>
          {switchControl('publicDiary', 'Показывать дневник другим читателям')}
        </Stack>
      </Paper>

      <FormAlert message={form.submitError} />

      {/* Кнопки активны, только когда есть несохранённые изменения */}
      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="contained" loading={form.isSubmitting} disabled={!form.isDirty}>
          Сохранить
        </Button>
        <Button onClick={() => form.reset()} disabled={!form.isDirty || form.isSubmitting}>
          Отменить изменения
        </Button>
      </Stack>

      <Snackbar
        open={savedOpen}
        autoHideDuration={3000}
        onClose={() => setSavedOpen(false)}
        message="Настройки сохранены"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Stack>
  )
}
