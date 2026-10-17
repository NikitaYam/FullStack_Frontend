import type { BookBrief } from '@/entities/book'
import type { UserBrief } from '@/entities/user'

export interface Review {
  id: string
  book: Pick<BookBrief, 'id' | 'title'>
  author: UserBrief
  rating: number
  text: string
}

export interface ReviewCreate {
  bookId: string
  rating: number
  text: string
}
