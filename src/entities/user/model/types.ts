export interface User {
  id: string
  name: string
  bio: string
  booksRead: number
  favoriteGenres: string[]
}

/** Краткие данные пользователя: автор поста, отзыва, собеседник */
export type UserBrief = Pick<User, 'id' | 'name'>

/** Настройки аккаунта текущего пользователя */
export interface AccountSettings {
  name: string
  bio: string
  email: string
  notifyMessages: boolean
  notifyRecommendations: boolean
  publicDiary: boolean
}
