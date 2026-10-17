import { db, nextId, toBookBrief } from '@/mocks/db'
import { getOrThrow, mockRequest } from '@/shared/api'
import { todayIso } from '@/shared/lib'
import type { DiaryEntry, DiaryEntryUpdate, DiaryLogEntry } from '../model/types'

const toEntry = ({ bookId, ...rest }: (typeof db.diaryEntries)[number]): DiaryEntry => ({
  book: toBookBrief(bookId),
  ...rest,
})

const findLogEntry = (id: string) =>
  getOrThrow(db.diaryLog.find((item) => item.id === id), 'Запись дневника не найдена')

export const diaryApi = {
  getEntries: (): Promise<DiaryEntry[]> => mockRequest(() => db.diaryEntries.map(toEntry)),

  /** Книга в дневнике или null, если её туда ещё не добавляли */
  getEntry: (bookId: string): Promise<DiaryEntry | null> =>
    mockRequest(() => {
      const record = db.diaryEntries.find((item) => item.bookId === bookId)
      return record ? toEntry(record) : null
    }),

  saveEntry: (bookId: string, update: DiaryEntryUpdate): Promise<DiaryEntry> =>
    mockRequest(() => {
      let record = db.diaryEntries.find((item) => item.bookId === bookId)
      if (record) {
        Object.assign(record, update)
      } else {
        record = { bookId, ...update }
        db.diaryEntries.push(record)
      }
      return toEntry(record)
    }),

  getLog: (bookId: string): Promise<DiaryLogEntry[]> =>
    mockRequest(() =>
      db.diaryLog.filter((item) => item.bookId === bookId).sort((a, b) => b.date.localeCompare(a.date)),
    ),

  addLog: (bookId: string, text: string): Promise<DiaryLogEntry> =>
    mockRequest(() => {
      const entry = { id: nextId('dl'), bookId, date: todayIso(), text: text.trim() }
      db.diaryLog.push(entry)
      return entry
    }),

  updateLog: (id: string, text: string): Promise<DiaryLogEntry> =>
    mockRequest(() => {
      const entry = findLogEntry(id)
      entry.text = text.trim()
      return entry
    }),

  deleteLog: (id: string): Promise<void> =>
    mockRequest(() => {
      db.diaryLog.splice(db.diaryLog.indexOf(findLogEntry(id)), 1)
    }),
}
