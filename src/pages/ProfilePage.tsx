import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import { postApi } from '@/entities/post'
import { ReviewCard, reviewApi } from '@/entities/review'
import { CURRENT_USER_ID, UserAvatar, userApi } from '@/entities/user'
import { isNotFoundError } from '@/shared/api'
import { routes } from '@/shared/config/routes'
import { useAsync } from '@/shared/lib'
import { AsyncView, EmptyState } from '@/shared/ui'
import NotFoundPage from './NotFoundPage'

export default function ProfilePage() {
  const { userId = '' } = useParams()

  const loadProfile = useCallback(async () => {
    const [user, posts, reviews] = await Promise.all([
      userApi.getById(userId),
      postApi.getByAuthor(userId),
      reviewApi.getByAuthor(userId),
    ])
    return { user, posts, reviews }
  }, [userId])
  const { state, reload } = useAsync(loadProfile)

  return (
    <AsyncView
      state={state}
      onRetry={reload}
      renderError={(error) => (isNotFoundError(error) ? <NotFoundPage /> : undefined)}
    >
      {({ user, posts, reviews }) => {
        const isOwnProfile = user.id === CURRENT_USER_ID

        return (
          <Stack spacing={3} sx={{ maxWidth: 640 }}>
            <Paper sx={{ p: 3 }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: { sm: 'center' } }}>
                <UserAvatar user={user} size={80} />
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
                  <Button variant="outlined" component={Link} to={routes.settings}>
                    Редактировать профиль
                  </Button>
                ) : (
                  <Button variant="contained" component={Link} to={routes.chat(user.id)}>
                    Написать сообщение
                  </Button>
                )}
              </Stack>
            </Paper>

            <Box>
              <Typography variant="h6" gutterBottom>
                Посты
              </Typography>
              {posts.length === 0 ? (
                <EmptyState title="Пока нет публикаций" />
              ) : (
                <Stack spacing={1}>
                  {posts.map((post) => (
                    <Paper key={post.id} sx={{ p: 2 }}>
                      <Typography
                        component={Link}
                        to={routes.post(post.id)}
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
              {reviews.length === 0 ? (
                <EmptyState title="Пока нет отзывов" />
              ) : (
                <Stack spacing={1}>
                  {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} showBook />
                  ))}
                </Stack>
              )}
            </Box>
          </Stack>
        )
      }}
    </AsyncView>
  )
}
