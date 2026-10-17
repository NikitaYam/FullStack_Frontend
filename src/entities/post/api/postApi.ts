import { CURRENT_USER_ID } from '@/entities/user'
import { db, nextId, toBookBrief, toUserBrief } from '@/mocks/db'
import { getOrThrow, mockRequest } from '@/shared/api'
import type { Post, PostComment, PostDetail } from '../model/types'

type PostRecord = (typeof db.posts)[number]
type CommentRecord = (typeof db.comments)[number]

const toPost = ({ id, authorId, bookId, text, likedBy }: PostRecord): Post => ({
  id,
  author: toUserBrief(authorId),
  book: bookId ? toBookBrief(bookId) : null,
  text,
  likes: likedBy.length,
  likedByMe: likedBy.includes(CURRENT_USER_ID),
  commentsCount: db.comments.filter((comment) => comment.postId === id).length,
})

const toComment = ({ id, authorId, text }: CommentRecord): PostComment => ({
  id,
  author: toUserBrief(authorId),
  text,
})

const findPost = (postId: string) => getOrThrow(db.posts.find((post) => post.id === postId), 'Пост не найден')

export const postApi = {
  getFeed: (): Promise<Post[]> => mockRequest(() => db.posts.map(toPost)),

  getByAuthor: (userId: string): Promise<Post[]> =>
    mockRequest(() => db.posts.filter((post) => post.authorId === userId).map(toPost)),

  getById: (postId: string): Promise<PostDetail> =>
    mockRequest(() => {
      const post = findPost(postId)
      const comments = db.comments.filter((comment) => comment.postId === post.id).map(toComment)
      return { ...toPost(post), comments }
    }),

  create: (text: string): Promise<Post> =>
    mockRequest(() => {
      const record = { id: nextId('p'), authorId: CURRENT_USER_ID, bookId: null, text: text.trim(), likedBy: [] }
      db.posts.unshift(record)
      return toPost(record)
    }),

  /** Поставить или убрать лайк текущего пользователя */
  toggleLike: (postId: string): Promise<Pick<Post, 'likes' | 'likedByMe'>> =>
    mockRequest(() => {
      const post = findPost(postId)
      post.likedBy = post.likedBy.includes(CURRENT_USER_ID)
        ? post.likedBy.filter((userId) => userId !== CURRENT_USER_ID)
        : [...post.likedBy, CURRENT_USER_ID]
      const { likes, likedByMe } = toPost(post)
      return { likes, likedByMe }
    }),

  addComment: (postId: string, text: string): Promise<PostComment> =>
    mockRequest(() => {
      findPost(postId)
      const record = { id: nextId('c'), postId, authorId: CURRENT_USER_ID, text: text.trim() }
      db.comments.push(record)
      return toComment(record)
    }),
}
