import { Box, Card, CardActionArea, CardContent, Rating, Typography } from '@mui/material'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { Book } from '../types'

interface BookCardProps {
  book: Book
  children?: ReactNode
}

export default function BookCard({ book, children }: BookCardProps) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardActionArea component={Link} to={`/books/${book.id}`}>
        <Box
          sx={{
            height: 140,
            bgcolor: book.color,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h2">{book.title.charAt(0)}</Typography>
        </Box>
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