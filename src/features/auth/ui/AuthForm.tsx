import { Button, Collapse, Stack, TextField } from '@mui/material'
import { useForm } from '@/shared/lib'
import { FormAlert } from '@/shared/ui'
import { authApi } from '../api/authApi'
import { emptyAuthForm, PASSWORD_MIN_LENGTH, validateAuth } from '../model/validation'
import type { AuthMode } from '../model/validation'
import { PasswordField } from './PasswordField'

interface AuthFormProps {
  mode: AuthMode
  onSuccess: () => void
}

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const isRegister = mode === 'register'

  const form = useForm({
    initialValues: emptyAuthForm,
    validate: (values) => validateAuth(values, mode),
    onSubmit: async ({ name, email, password }) => {
      if (isRegister) await authApi.register({ name, email, password })
      else await authApi.login({ email, password })
      onSuccess()
    },
  })

  return (
    <Stack component="form" noValidate spacing={2} sx={{ mt: 3 }} onSubmit={form.handleSubmit}>
      {/* Поля регистрации плавно появляются при переключении вкладки */}
      <Collapse in={isRegister} unmountOnExit>
        <TextField label="Никнейм" fullWidth required {...form.textFieldProps('name')} />
      </Collapse>

      <TextField label="Email" type="email" autoComplete="email" required {...form.textFieldProps('email')} />

      <PasswordField
        label="Пароль"
        autoComplete={isRegister ? 'new-password' : 'current-password'}
        required
        {...form.textFieldProps(
          'password',
          isRegister ? `Не короче ${PASSWORD_MIN_LENGTH} символов, буквы и цифры` : undefined,
        )}
      />

      <Collapse in={isRegister} unmountOnExit>
        <PasswordField
          label="Повторите пароль"
          autoComplete="new-password"
          fullWidth
          required
          {...form.textFieldProps('passwordConfirm')}
        />
      </Collapse>

      <FormAlert message={form.submitError} />

      <Button type="submit" variant="contained" size="large" loading={form.isSubmitting}>
        {isRegister ? 'Зарегистрироваться' : 'Войти'}
      </Button>
    </Stack>
  )
}
