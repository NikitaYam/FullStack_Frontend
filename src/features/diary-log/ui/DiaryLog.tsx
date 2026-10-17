import { useCallback } from 'react'
import { Box, Typography } from '@mui/material'
import { diaryApi } from '@/entities/diary'
import { useAsync } from '@/shared/lib'
import { AnimatedList, AsyncView, EmptyState } from '@/shared/ui'
import { LogEntryItem } from './LogEntryItem'
import { NewLogEntryForm } from './NewLogEntryForm'

/** Заметки о чтении книги: список с добавлением, редактированием и удалением */
export function DiaryLog({ bookId }: { bookId: string }) {
  const loadLog = useCallback(() => diaryApi.getLog(bookId), [bookId])
  const { state, reload, setData } = useAsync(loadLog)

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Записи о чтении
      </Typography>

      <AsyncView state={state} onRetry={reload}>
        {(entries) => (
          <>
            {entries.length === 0 && (
              <EmptyState title="Записей пока нет" description="Добавьте первую заметку ниже." />
            )}
            <AnimatedList
              items={entries}
              getKey={(entry) => entry.id}
              spacing={1}
              renderItem={(entry) => (
                <LogEntryItem
                  entry={entry}
                  onUpdated={(updated) =>
                    setData((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
                  }
                  onDeleted={(id) => setData((prev) => prev.filter((item) => item.id !== id))}
                />
              )}
            />
            <Box sx={{ mt: 1 }}>
              <NewLogEntryForm bookId={bookId} onCreated={(entry) => setData((prev) => [entry, ...prev])} />
            </Box>
          </>
        )}
      </AsyncView>
    </Box>
  )
}
