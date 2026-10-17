import type { BookBrief } from '@/entities/book'

export type ReadingStatus = 'want' | 'reading' | 'done'

/** Книга в дневнике пользователя */
export interface DiaryEntry {
  book: BookBrief
  status: ReadingStatus
  progress: number
  rating: number | null
}

export type DiaryEntryUpdate = Pick<DiaryEntry, 'status' | 'progress' | 'rating'>

/** Заметка о чтении конкретной книги */
export interface DiaryLogEntry {
  id: string
  bookId: string
  date: string
  text: string
}
