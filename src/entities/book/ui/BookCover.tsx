import { Box, Typography } from '@mui/material'
import type { TypographyProps } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'
import type { BookBrief } from '../model/types'

interface BookCoverProps {
  book: Pick<BookBrief, 'title' | 'color'>
  letterVariant?: TypographyProps['variant']
  sx?: SxProps<Theme>
}

/** Обложка-заглушка: цветной блок с первой буквой названия */
export function BookCover({ book, letterVariant = 'h2', sx }: BookCoverProps) {
  return (
    <Box
      sx={[
        {
          bgcolor: book.color,
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography variant={letterVariant}>{book.title.charAt(0)}</Typography>
    </Box>
  )
}