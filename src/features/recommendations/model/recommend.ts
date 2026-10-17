import { bookApi } from '@/entities/book'
import type { Book } from '@/entities/book'
import { diaryApi } from '@/entities/diary'
import type { DiaryEntry } from '@/entities/diary'
import { CURRENT_USER_ID, userApi } from '@/entities/user'
import type { User } from '@/entities/user'

/** Всё, что нужно для подбора книг: каталог, пользователь и его дневник */
export interface RecommendationContext {
  books: Book[]
  user: User
  entries: DiaryEntry[]
}

export async function loadRecommendationContext(): Promise<RecommendationContext> {
  const [books, user, entries] = await Promise.all([
    bookApi.getAll(),
    userApi.getById(CURRENT_USER_ID),
    diaryApi.getEntries(),
  ])
  return { books, user, entries }
}

const DEFAULT_LIMIT = 3

// Книги, которых ещё нет в дневнике пользователя
function unreadBooks({ books, entries }: RecommendationContext): Book[] {
  const inDiary = new Set(entries.map((entry) => entry.book.id))
  return books.filter((book) => !inDiary.has(book.id))
}

/** Только книги любимых жанров */
export function recommendByGenres(context: RecommendationContext, limit = DEFAULT_LIMIT): Book[] {
  const favorite = new Set(context.user.favoriteGenres)
  return unreadBooks(context)
    .filter((book) => favorite.has(book.genre))
    .slice(0, limit)
}

/** Книги тех жанров, что уже есть в дневнике */
export function recommendByDiary(context: RecommendationContext, limit = DEFAULT_LIMIT): Book[] {
  const diaryGenres = new Set(context.entries.map((entry) => entry.book.genre))
  return unreadBooks(context)
    .filter((book) => diaryGenres.has(book.genre))
    .slice(0, limit)
}

/** Сначала любимые жанры, затем остальные непрочитанные книги — для главной страницы */
export function recommendForUser(context: RecommendationContext, limit = DEFAULT_LIMIT): Book[] {
  const favorite = new Set(context.user.favoriteGenres)
  const candidates = unreadBooks(context)
  return [
    ...candidates.filter((book) => favorite.has(book.genre)),
    ...candidates.filter((book) => !favorite.has(book.genre)),
  ].slice(0, limit)
}

/**
 * Поиск по свободному запросу: считаем, сколько слов запроса встречается в описании книги.
 * Слова грубо «обрезаются» до основы, чтобы «детективы» находили «детектив».
 */
export function recommendByQuery(context: RecommendationContext, query: string, limit = DEFAULT_LIMIT): Book[] {
  const stems = query
    .toLowerCase()
    .split(/[^\p{L}\d]+/u)
    .filter((word) => word.length > 2)
    .map((word) => word.slice(0, Math.max(4, word.length - 2)))

  return context.books
    .map((book) => {
      const text = `${book.title} ${book.author} ${book.genre} ${book.description}`.toLowerCase()
      return { book, score: stems.filter((stem) => text.includes(stem)).length }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.book.rating - a.book.rating)
    .slice(0, limit)
    .map(({ book }) => book)
}
