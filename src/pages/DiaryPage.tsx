import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  LinearProgress,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  Rating,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { diaryApi, readingStatuses, ReadingStatusChip, statusLabels } from '@/entities/diary'
import type { ReadingStatus } from '@/entities/diary'
import { routes } from '@/shared/config/routes'
import { useAsync } from '@/shared/lib'
import { AnimatedList, AsyncView, EmptyState } from '@/shared/ui'

type StatusFilter = ReadingStatus | 'all'

export default function DiaryPage() {
  const { state, reload } = useAsync(diaryApi.getEntries)
  const [filter, setFilter] = useState<StatusFilter>('all')

  return (
    <Stack spacing={3} sx={{ maxWidth: 640 }}>
      <Typography variant="h4">Дневник чтения</Typography>

      <AsyncView
        state={state}
        onRetry={reload}
        isEmpty={(entries) => entries.length === 0}
        empty={
          <EmptyState
            title="В дневнике пока нет книг"
            description="Откройте книгу и нажмите «В дневник»."
            action={
              <Button variant="outlined" component={Link} to={routes.market}>
                Выбрать книгу
              </Button>
            }
          />
        }
      >
        {(entries) => {
          const countByStatus = (status: ReadingStatus) => entries.filter((entry) => entry.status === status).length
          const visible = entries.filter((entry) => filter === 'all' || entry.status === filter)

          return (
            <Stack spacing={2}>
              <ToggleButtonGroup
                exclusive
                size="small"
                value={filter}
                onChange={(_event, value: StatusFilter | null) => {
                  if (value) setFilter(value)
                }}
                sx={{ flexWrap: 'wrap' }}
              >
                <ToggleButton value="all">Все ({entries.length})</ToggleButton>
                {readingStatuses.map((status) => (
                  <ToggleButton key={status} value={status}>
                    {statusLabels[status]} ({countByStatus(status)})
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>

              {visible.length === 0 && <EmptyState title="Нет книг с таким статусом" />}

              {/* При смене фильтра записи плавно схлопываются и раскрываются */}
              <Paper sx={{ overflow: 'hidden' }}>
                <AnimatedList
                  items={visible}
                  getKey={(entry) => entry.book.id}
                  spacing={0}
                  renderItem={(entry) => (
                    <ListItemButton component={Link} to={routes.bookDiary(entry.book.id)} divider>
                      <ListItemAvatar>
                        <Avatar variant="rounded" sx={{ bgcolor: entry.book.color }}>
                          {entry.book.title.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={entry.book.title} secondary={entry.book.author} sx={{ mr: 2 }} />
                      <Stack spacing={0.5} sx={{ minWidth: 150, alignItems: 'flex-end' }}>
                        <ReadingStatusChip status={entry.status} />
                        {entry.status === 'reading' && (
                          <Box sx={{ width: '100%' }}>
                            <LinearProgress variant="determinate" value={entry.progress} />
                          </Box>
                        )}
                        {entry.rating !== null && <Rating value={entry.rating} readOnly size="small" />}
                      </Stack>
                    </ListItemButton>
                  )}
                />
              </Paper>
            </Stack>
          )
        }}
      </AsyncView>
    </Stack>
  )
}
