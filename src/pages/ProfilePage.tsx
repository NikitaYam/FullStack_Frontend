import { Link, useParams } from 'react-router-dom'
import { Avatar, Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import NotFoundPage from './NotFoundPage'
import { currentUserId, getUser, posts, reviews } from '../data/mock'

export default function ProfilePage() {
  const { userId } = useParams()
  const user = getUser(userId ?? '')

  if (!user) return <NotFoundPage />

  const isOwnProfile = user.id === currentUserId
  const userPosts = posts.filter((post) => post.authorId === user.id)
  const userReviews = reviews.filter((review) => review.authorId === user.id)

  return (
    <Stack spacing={3} sx={{ maxWidth: 640 }}>
      <Paper sx={{ p: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: { sm: 'center' } }}>
          <Avatar sx={{ width: 80, height: 80, fontSize: 32 }}>{user.name.charAt(0)}</Avatar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h4">{user.name}</Typography>
            <Typography color="text.secondary">{user.bio}</Typography>
            <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 1, flexWrap: 'wrap' }}>
              {user.favoriteGenres.map((genre) => (
                <Chip key={genre} label={genre} size="small" />
              ))}
            </Stack>
            <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
              Прочитано книг: {user.booksRead}
            </Typography>
          </Box>
          {isOwnProfile ? (
            <Button variant="outlined" component={Link} to="/settings">
              Редактировать профиль
            </Button>
          ) : (
            <Button variant="contained" component={Link} to={`/chats/${user.id}`}>
              Написать сообщение
            </Button>
          )}
        </Stack>
      </Paper>

      <Box>
        <Typography variant="h6" gutterBottom>
          Посты
        </Typography>
        {userPosts.length === 0 ? (
          <Typography color="text.secondary">Пока нет публикаций.</Typography>
        ) : (
          <Stack spacing={1}>
            {userPosts.map((post) => (
              <Paper key={post.id} sx={{ p: 2 }}>
                <Typography
                  component={Link}
                  to={`/social/${post.id}`}
                  sx={{ color: 'inherit', textDecoration: 'none' }}
                >
                  {post.text}
                </Typography>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
          Отзывы о книгах
        </Typography>
        {userReviews.length === 0 ? (
          <Typography color="text.secondary">Пока нет отзывов.</Typography>
        ) : (
          <Stack spacing={1}>
            {userReviews.map((review) => (
              <Paper key={review.id} sx={{ p: 2 }}>
                <Typography>{review.text}</Typography>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </Stack>
  )
}