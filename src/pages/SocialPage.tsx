import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined'
import { currentUserId, getBook, getUser, posts } from '../data/mock'
import type { Post } from '../types'

export default function SocialPage() {
  const [postList, setPostList] = useState<Post[]>(posts)
  const [newPostText, setNewPostText] = useState('')

  const handlePublish = () => {
    if (newPostText.trim() === '') return
    const newPost: Post = {
      id: `my-${postList.length}`,
      authorId: currentUserId,
      text: newPostText.trim(),
      likes: 0,
      comments: [],
    }
    setPostList([newPost, ...postList])
    setNewPostText('')
  }

  const handleLike = (postId: string) => {
    setPostList(
      postList.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)),
    )
  }

  return (
    <Stack spacing={3} sx={{ maxWidth: 640 }}>
      <Typography variant="h4">Лента читателей</Typography>

      <Paper sx={{ p: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Что вы читаете или думаете?"
            multiline
            minRows={2}
            value={newPostText}
            onChange={(event) => setNewPostText(event.target.value)}
          />
          <Box>
            <Button variant="contained" onClick={handlePublish}>
              Опубликовать
            </Button>
          </Box>
        </Stack>
      </Paper>

      <Stack spacing={2}>
        {postList.map((post) => {
          const author = getUser(post.authorId)
          const book = post.bookId ? getBook(post.bookId) : undefined
          return (
            <Card key={post.id}>
              <CardActionArea component={Link} to={`/social/${post.id}`}>
                <CardContent>
                  <Stack direction="row" spacing={2}>
                    <Avatar>{author?.name.charAt(0)}</Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography sx={{ fontWeight: 600 }}>{author?.name}</Typography>
                      <Typography sx={{ mt: 1 }}>{post.text}</Typography>
                      {book && (
                        <Chip label={`Книга: ${book.title}`} size="small" sx={{ mt: 1 }} />
                      )}
                    </Box>
                  </Stack>
                </CardContent>
              </CardActionArea>
              <Stack direction="row" spacing={2} sx={{ px: 2, pb: 2, alignItems: 'center' }}>
                <Button
                  size="small"
                  startIcon={<FavoriteBorderIcon />}
                  onClick={() => handleLike(post.id)}
                >
                  {post.likes}
                </Button>
                <Button size="small" startIcon={<ChatBubbleOutlineIcon />} component={Link} to={`/social/${post.id}`}>
                  {post.comments.length}
                </Button>
              </Stack>
            </Card>
          )
        })}
      </Stack>
    </Stack>
  )
}