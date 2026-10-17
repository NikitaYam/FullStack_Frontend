import { Box, Card, CardActionArea, CardContent, Rating, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '@/shared/config/routes'
import type { Book } from '../model/types'
import { BookCover } from './BookCover'

interface BookCardProps {
  book: Book
  /** Дополнительные элементы под карточкой: прогресс, кнопки */
  children?: ReactNode
}

export function BookCard({ book, children }: BookCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
      }}
    >
      <CardActionArea component={Link} to={routes.book(book.id)}>
        <BookCover book={book} sx={{ height: 140 }} />
        <CardContent>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {book.author}
          </Typography>
          <Rating value={book.rating} precision={0.1} readOnly size="small" />
        </CardContent>
      </CardActionArea>
      {children && <Box sx={{ p: 2, pt: 0, mt: 'auto' }}>{children}</Box>}
    </Card>
  )
}