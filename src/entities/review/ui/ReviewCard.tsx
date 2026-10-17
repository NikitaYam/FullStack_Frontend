import { Box, Paper, Rating, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { UserAvatar, UserLink } from '@/entities/user'
import { routes } from '@/shared/config/routes'
import type { Review } from '../model/types'

interface ReviewCardProps {
  review: Review
  /** Показывать название книги (в профиле), а не автора (на странице книги) */
  showBook?: boolean
}

export function ReviewCard({ review, showBook = false }: ReviewCardProps) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack direction="row" spacing={2}>
        {!showBook && <UserAvatar user={review.author} />}
        <Box>
          {showBook ? (
            <Typography
              component={Link}
              to={routes.book(review.book.id)}
              sx={{ color: 'inherit', fontWeight: 600, textDecoration: 'none' }}
            >
              {review.book.title}
            </Typography>
          ) : (
            <UserLink user={review.author} />
          )}
          <Box>
            <Rating value={review.rating} readOnly size="small" />
          </Box>
          {review.text && <Typography>{review.text}</Typography>}
        </Box>
      </Stack>
    </Paper>
  )
}
