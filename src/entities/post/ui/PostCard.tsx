import { Box, Card, CardActionArea, CardContent, Chip, Stack, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { UserAvatar } from '@/entities/user'
import { routes } from '@/shared/config/routes'
import type { Post } from '../model/types'

interface PostCardProps {
  post: Post
  /** Кнопки под постом: лайк, комментарии */
  actions?: ReactNode
}

export function PostCard({ post, actions }: PostCardProps) {
  return (
    <Card>
      <CardActionArea component={Link} to={routes.post(post.id)}>
        <CardContent>
          <Stack direction="row" spacing={2}>
            <UserAvatar user={post.author} />
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 600 }}>{post.author.name}</Typography>
              <Typography sx={{ mt: 1, whiteSpace: 'pre-line' }}>{post.text}</Typography>
              {post.book && <Chip label={`Книга: ${post.book.title}`} size="small" sx={{ mt: 1 }} />}
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
      {actions && (
        <Stack direction="row" spacing={2} sx={{ px: 2, pb: 2, alignItems: 'center' }}>
          {actions}
        </Stack>
      )}
    </Card>
  )
}
