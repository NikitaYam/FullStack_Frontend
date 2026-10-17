import { IconButton, InputAdornment, MenuItem, Stack, TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import SearchIcon from '@mui/icons-material/Search'
import { ALL_GENRES, sortLabels } from '../model/filterBooks'
import type { BookFilterValues, BookSort } from '../model/filterBooks'

interface BookFiltersProps {
  value: BookFilterValues
  onChange: (value: BookFilterValues) => void
  genres: string[]
}

export function BookFilters({ value, onChange, genres }: BookFiltersProps) {
  const update = (patch: Partial<BookFilterValues>) => onChange({ ...value, ...patch })

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <TextField
        label="Поиск по названию или автору"
        value={value.query}
        onChange={(event) => update({ query: event.target.value })}
        sx={{ flexGrow: 1 }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: value.query && (
              <InputAdornment position="end">
                <IconButton aria-label="Очистить поиск" onClick={() => update({ query: '' })} edge="end">
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <TextField
        select
        label="Жанр"
        value={value.genre}
        onChange={(event) => update({ genre: event.target.value })}
        sx={{ minWidth: 180 }}
      >
        <MenuItem value={ALL_GENRES}>Все жанры</MenuItem>
        {genres.map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        select
        label="Сортировка"
        value={value.sort}
        onChange={(event) => update({ sort: event.target.value as BookSort })}
        sx={{ minWidth: 180 }}
      >
        {(Object.keys(sortLabels) as BookSort[]).map((sort) => (
          <MenuItem key={sort} value={sort}>
            {sortLabels[sort]}
          </MenuItem>
        ))}
      </TextField>
    </Stack>
  )
}
