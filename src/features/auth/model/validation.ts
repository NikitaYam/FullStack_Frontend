import { isEmail, validateText } from '@/shared/lib'
import type { FormErrors } from '@/shared/lib'

export type AuthMode = 'login' | 'register'

export interface AuthFormValues {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

export const emptyAuthForm: AuthFormValues = { name: '', email: '', password: '', passwordConfirm: '' }

export const PASSWORD_MIN_LENGTH = 8

export function validateAuth(values: AuthFormValues, mode: AuthMode): FormErrors<AuthFormValues> {
  const errors: FormErrors<AuthFormValues> = {}

  if (values.email.trim() === '') errors.email = 'Введите email'
  else if (!isEmail(values.email)) errors.email = 'Некорректный email, пример: reader@example.com'

  if (values.password === '') errors.password = 'Введите пароль'

  if (mode === 'register') {
    const nameError = validateText(values.name, { min: 2, max: 30 })
    if (nameError) errors.name = nameError

    if (values.password && values.password.length < PASSWORD_MIN_LENGTH) {
      errors.password = `Пароль должен быть не короче ${PASSWORD_MIN_LENGTH} символов`
    } else if (values.password && !(/\d/.test(values.password) && /\p{L}/u.test(values.password))) {
      errors.password = 'Пароль должен содержать буквы и цифры'
    }

    if (values.passwordConfirm !== values.password) errors.passwordConfirm = 'Пароли не совпадают'
  }

  return errors
}
