import { useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import { CommentItem, postApi } from '@/entities/post'
import { UserAvatar, UserLink } from '@/entities/user'
import { CommentForm } from '@/features/comment-create'
import { LikeButton } from '@/features/post-like'
import { isNotFoundError } from '@/shared/api'
import { routes } from '@/shared/config/routes'
import { useAsync } from '@/shared/lib'
import { AnimatedList, AsyncView, EmptyState } from '@/shared/ui'
import NotFoundPage from './NotFoundPage'

export default function PostPage() {
  const { postId = '' } = useParams()
  const loadPost = useCallback(() => postApi.getById(postId), [postId])
  const { state, reload, setData } = useAsync(loadPost)

  return (
    <AsyncView
      state={state}
      onRetry={reload}
      renderError={(error) => (isNotFoundError(error) ? <NotFoundPage /> : undefined)}
    >
      {(post) => (
        <Stack spacing={3} sx={{ maxWidth: 640 }}>
          <Paper sx={{ p: 2 }}>
            <Stack direction="row" spacing={2}>
              <UserAvatar user={post.author} />
              <Box sx={{ flexGrow: 1 }}>
                <UserLink user={post.author} />
                <Typography sx={{ mt: 1, whiteSpace: 'pre-line' }}>{post.text}</Typography>
                {post.book && (
                  <Chip
                    component={Link}
                    to={routes.book(post.book.id)}
                    clickable
                    label={`Книга: ${post.book.title}`}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                )}
                <Box sx={{ mt: 1 }}>
                  <LikeButton
                    postId={post.id}
                    likes={post.likes}
                    likedByMe={post.likedByMe}
                    onChange={(like) => setData((prev) => ({ ...prev, ...like }))}
                  />
                </Box>
              </Box>
            </Stack>
          </Paper>

          <Box>
            <Typography variant="h6" gutterBottom>
              Комментарии
            </Typography>
            {post.comments.length === 0 && <EmptyState title="Комментариев пока нет" />}
            <AnimatedList
              items={post.comments}
              getKey={(comment) => comment.id}
              renderItem={(comment) => <CommentItem comment={comment} />}
            />
            <CommentForm
              postId={post.id}
              onCreated={(comment) =>
                setData((prev) => ({
                  ...prev,
                  comments: [...prev.comments, comment],
                  commentsCount: prev.commentsCount + 1,
                }))
              }
            />
          </Box>

          <Button component={Link} to={routes.social} sx={{ alignSelf: 'flex-start' }}>
            Назад в ленту
          </Button>
        </Stack>
      )}
    </AsyncView>
  )
}
