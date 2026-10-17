import { Box, Stack, Typography } from '@mui/material'
import { UserAvatar, UserLink } from '@/entities/user'
import type { PostComment } from '../model/types'

export function CommentItem({ comment }: { comment: PostComment }) {
  return (
    <Stack direction="row" spacing={2}>
      <UserAvatar user={comment.author} size={32} />
      <Box>
        <UserLink user={comment.author} />
        <Typography sx={{ whiteSpace: 'pre-line' }}>{comment.text}</Typography>
      </Box>
    </Stack>
  )
}
