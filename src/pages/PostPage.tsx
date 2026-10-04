import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Avatar, Box, Button, Chip, Paper, Stack, TextField, Typography } from '@mui/material'
import NotFoundPage from './NotFoundPage'
import { currentUserId, getBook, getPost, getUser } from '../data/mock'
import type { PostComment } from '../types'

export default function PostPage() {
  const { postId } = useParams()
  const post = getPost(postId ?? '')

  const [comments, setComments] = useState<PostComment[]>(post?.comments ?? [])
  const [text, setText] = useState('')

  if (!post) return <NotFoundPage />

  const author = getUser(post.authorId)
  const book = post.bookId ? getBook(post.bookId) : undefined

  const handleAddComment = () => {
    if (text.trim() === '') return
    const newComment: PostComment = {
      id: `my-${comments.length}`,
      authorId: currentUserId,
      text: text.trim(),
    }
    setComments([...comments, newComment])
    setText('')
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 640 }}>
      <Paper sx={{ p: 2 }}>
        <Stack direction="row" spacing={2}>
          <Avatar>{author?.name.charAt(0)}</Avatar>
          <Box>
            <Typography
              component={Link}
              to={`/profile/${post.authorId}`}
              sx={{ color: 'inherit', fontWeight: 600, textDecoration: 'none' }}
            >
              {author?.name}
            </Typography>
            <Typography sx={{ mt: 1 }}>{post.text}</Typography>
            {book && (
              <Chip
                component={Link}
                to={`/books/${book.id}`}
                clickable
                label={`Книга: ${book.title}`}
                size="small"
                sx={{ mt: 1 }}
              />
            )}
          </Box>
        </Stack>
      </Paper>

      <Box>
        <Typography variant="h6" gutterBottom>
          Комментарии
        </Typography>
        <Stack spacing={2}>
          {comments.length === 0 && (
            <Typography color="text.secondary">Комментариев пока нет.</Typography>
          )}
          {comments.map((comment) => {
            const commentAuthor = getUser(comment.authorId)
            return (
              <Stack key={comment.id} direction="row" spacing={2}>
                <Avatar sx={{ width: 32, height: 32 }}>{commentAuthor?.name.charAt(0)}</Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 600 }}>{commentAuthor?.name}</Typography>
                  <Typography>{comment.text}</Typography>
                </Box>
              </Stack>
            )
          })}
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <TextField
            label="Написать комментарий"
            size="small"
            value={text}
            onChange={(event) => setText(event.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button variant="contained" onClick={handleAddComment}>
            Отправить
          </Button>
        </Stack>
      </Box>

      <Button component={Link} to="/social" sx={{ alignSelf: 'flex-start' }}>
        Назад в ленту
      </Button>
    </Stack>
  )
}