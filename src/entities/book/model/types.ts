export interface Book {
  id: string
  title: string
  author: string
  genre: string
  year: number
  rating: number
  description: string
  color: string
}

/** Краткие данные книги для списков и карточек в других сущностях */
export type BookBrief = Pick<Book, 'id' | 'title' | 'author' | 'genre' | 'color'>

export interface Chapter {
  title: string
  paragraphs: string[]
}