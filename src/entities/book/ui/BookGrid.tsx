import { Box, Skeleton } from '@mui/material'
import type { ReactNode } from 'react'

interface BookGridProps {
  children: ReactNode
}

export function BookGrid({ children }: BookGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 2,
      }}
    >
      {children}
    </Box>
  )
}

/** Заглушка сетки книг на время загрузки */
export function BookGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <BookGrid>
      {Array.from({ length: count }, (_, index) => (
        <Box key={index}>
          <Skeleton variant="rounded" height={140} />
          <Skeleton width="80%" sx={{ mt: 1 }} />
          <Skeleton width="50%" />
        </Box>
      ))}
    </BookGrid>
  )
}