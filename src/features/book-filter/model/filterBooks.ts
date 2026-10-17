import type { Book } from '@/entities/book'

export type BookSort = 'rating' | 'title' | 'year'

export interface BookFilterValues {
  query: string
  genre: string
  sort: BookSort
}

export const ALL_GENRES = 'all'

export const defaultBookFilter: BookFilterValues = { query: '', genre: ALL_GENRES, sort: 'rating' }

export const sortLabels: Record<BookSort, string> = {
  rating: 'По рейтингу',
  title: 'По названию',
  year: 'Сначала новые',
}

const comparators: Record<BookSort, (a: Book, b: Book) => number> = {
  rating: (a, b) => b.rating - a.rating,
  title: (a, b) => a.title.localeCompare(b.title, 'ru'),
  year: (a, b) => b.year - a.year,
}

export function filterBooks(books: Book[], { query, genre, sort }: BookFilterValues): Book[] {
  const normalizedQuery = query.trim().toLowerCase()
  return books
    .filter((book) => {
      const matchesQuery = `${book.title} ${book.author}`.toLowerCase().includes(normalizedQuery)
      const matchesGenre = genre === ALL_GENRES || book.genre === genre
      return matchesQuery && matchesGenre
    })
    .sort(comparators[sort])
}

export function getGenres(books: Book[]): string[] {
  return Array.from(new Set(books.map((book) => book.genre))).sort((a, b) => a.localeCompare(b, 'ru'))
}

export function isFilterActive(filter: BookFilterValues): boolean {
  return filter.query.trim() !== '' || filter.genre !== ALL_GENRES
}
