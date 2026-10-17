import type { BookBrief } from '@/entities/book'
import type { UserBrief } from '@/entities/user'

export interface Post {
  id: string
  author: UserBrief
  book: BookBrief | null
  text: string
  likes: number
  likedByMe: boolean
  commentsCount: number
}

export interface PostComment {
  id: string
  author: UserBrief
  text: string
}

/** Пост вместе с комментариями — для страницы поста */
export interface PostDetail extends Post {
  comments: PostComment[]
}
