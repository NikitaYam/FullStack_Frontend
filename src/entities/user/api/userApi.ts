import { db } from '@/mocks/db'
import { ApiError, getOrThrow, mockRequest } from '@/shared/api'
import { CURRENT_USER_ID } from '../model/session'
import type { AccountSettings, User } from '../model/types'

const findUser = (userId: string) =>
  getOrThrow(db.users.find((user) => user.id === userId), 'Пользователь не найден')

export const userApi = {
  getById: (userId: string): Promise<User> => mockRequest(() => findUser(userId)),

  getSettings: (): Promise<AccountSettings> =>
    mockRequest(() => {
      const me = findUser(CURRENT_USER_ID)
      return { name: me.name, bio: me.bio, ...db.account }
    }),

  updateSettings: (settings: AccountSettings): Promise<AccountSettings> =>
    mockRequest(() => {
      // Проверка, которую может сделать только сервер — для демонстрации ошибки отправки формы
      if (settings.email.trim().toLowerCase() === 'taken@example.com') {
        throw new ApiError('Этот email уже занят другим пользователем', 409)
      }
      const me = findUser(CURRENT_USER_ID)
      const { name, bio, ...account } = settings
      me.name = name.trim()
      me.bio = bio.trim()
      Object.assign(db.account, { ...account, email: account.email.trim() })
      return { name: me.name, bio: me.bio, ...db.account }
    }),
}
