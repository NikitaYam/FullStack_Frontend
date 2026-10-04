import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'
import BookGrid from '../components/BookGrid'
import { books } from '../data/mock'

export default function BookMarketPage() {
  return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Библиотека</Typography>
        <Button component={Link} to="/assistant">
          Что почитать?
        </Button>
      </Stack>

      <BookGrid>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </BookGrid>
    </Stack>
  )
}