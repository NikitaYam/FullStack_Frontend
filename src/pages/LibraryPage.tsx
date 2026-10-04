import { useState } from "react";
import {Button, MenuItem, Stack, TextField, Typography} from '@mui/material'
import {Link} from 'react-router-dom'
import BookCard from '../components/BookCard'
import BookGrid from '../components/BookGrid'
import {books} from '../data/mock'

const genres = Array.from(new Set(books.map((book) => book.genre)))

export default function LibraryPage() {
    const [query, setQuery] = useState('')
    const [genre, setGenre] = useState('all')

    const filteredBooks = books.filter((book) => {
        const text = `${book.title} ${book.author}`.toLowerCase()
        const matchesQuery = text.includes(query.toLowerCase())
        const matchesGenre = genre === 'all' || book.genre === genre
        return matchesQuery && matchesGenre
    })

    return (
    <Stack spacing={3}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Книжная полка</Typography>
        <Button component={Link} to="/assistant">
          Что почитать?
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField
          label="Поиск по названию или автору"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          sx={{ flexGrow: 1 }}
        />
        <TextField
          select
          label="Жанр"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="all">Все жанры</MenuItem>
          {genres.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {filteredBooks.length === 0 ? (
        <Typography color="text.secondary">Ничего не найдено. Попробуйте изменить запрос.</Typography>
      ) : (
        <BookGrid>
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </BookGrid>
      )}
    </Stack>
  )
}