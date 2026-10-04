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

export type ReadingStatus = 'want' | 'reading' | 'done'

export interface DiaryEntry {
  bookId: string
  status: ReadingStatus
  progress: number
  rating: number
  notes: string
  quotes: string[]
}

export interface User {
  id: string
  name: string
  bio: string
  booksRead: number
  favoriteGenres: string[]
}

export interface Message {
  id: string
  fromMe: boolean
  text: string
}

export interface Chat {
  id: string
  userId: string
  messages: Message[]
}

export interface PostComment {
  id: string
  authorId: string
  text: string
}

export interface Post {
  id: string
  authorId: string
  bookId?: string
  text: string
  likes: number
  comments: PostComment[]
}

export interface Review {
  id: string
  bookId: string
  authorId: string
  rating: number
  text: string
}

export interface Chapter {
  title: string
  paragraphs: string[]
}

export interface DiaryLogEntry {
  id: string
  bookId: string
  date: string
  text: string
}