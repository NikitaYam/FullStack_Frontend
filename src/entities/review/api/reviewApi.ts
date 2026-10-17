import { CURRENT_USER_ID } from '@/entities/user'
import { db, nextId, toBookBrief, toUserBrief } from '@/mocks/db'
import { mockRequest } from '@/shared/api'
import type { Review, ReviewCreate } from '../model/types'

const toReview = ({ bookId, authorId, ...rest }: (typeof db.reviews)[number]): Review => {
  const { id, title } = toBookBrief(bookId)
  return { book: { id, title }, author: toUserBrief(authorId), ...rest }
}

export const reviewApi = {
  getByBook: (bookId: string): Promise<Review[]> =>
    mockRequest(() => db.reviews.filter((item) => item.bookId === bookId).map(toReview)),

  getByAuthor: (userId: string): Promise<Review[]> =>
    mockRequest(() => db.reviews.filter((item) => item.authorId === userId).map(toReview)),

  create: ({ bookId, rating, text }: ReviewCreate): Promise<Review> =>
    mockRequest(() => {
      const record = { id: nextId('r'), bookId, authorId: CURRENT_USER_ID, rating, text: text.trim() }
      db.reviews.unshift(record)
      return toReview(record)
    }),
}
