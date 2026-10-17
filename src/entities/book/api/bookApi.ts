import { db } from '@/mocks/db'
import { getOrThrow, mockRequest } from '@/shared/api'
import type { Book, Chapter } from '../model/types'

const findBook = (bookId: string) => getOrThrow(db.books.find((book) => book.id === bookId), 'Книга не найдена')

export const bookApi = {
  getAll: (): Promise<Book[]> => mockRequest(() => db.books),

  getById: (bookId: string): Promise<Book> => mockRequest(() => findBook(bookId)),

  getChapters: (bookId: string): Promise<Chapter[]> =>
    mockRequest(() => {
      findBook(bookId)
      return db.chapters
    }),
}