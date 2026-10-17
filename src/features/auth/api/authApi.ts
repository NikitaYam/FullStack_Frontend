import { db } from '@/mocks/db'
import { ApiError, mockRequest } from '@/shared/api'
import type { AuthFormValues } from '../model/validation'

interface AuthResult {
  email: string
}

// Заглушка до ЛР №4: вход принимает любые данные,
// регистрация отклоняет уже занятый email — чтобы показать ошибку от сервера.
export const authApi = {
  login: ({ email }: Pick<AuthFormValues, 'email' | 'password'>): Promise<AuthResult> =>
    mockRequest(() => ({ email: email.trim() })),

  register: ({ email }: Omit<AuthFormValues, 'passwordConfirm'>): Promise<AuthResult> =>
    mockRequest(() => {
      if (email.trim().toLowerCase() === db.account.email) {
        throw new ApiError('Пользователь с таким email уже зарегистрирован', 409)
      }
      return { email: email.trim() }
    }),
}
