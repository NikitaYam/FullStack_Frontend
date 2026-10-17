import type { ReadingStatus } from './types'

export const statusLabels: Record<ReadingStatus, string> = {
  want: 'Хочу почитать',
  reading: 'Читаю',
  done: 'Прочитано',
}

export const readingStatuses = Object.keys(statusLabels) as ReadingStatus[]
