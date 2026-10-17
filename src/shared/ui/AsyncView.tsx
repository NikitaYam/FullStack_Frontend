import { Box, Fade } from '@mui/material'
import type { ReactNode } from 'react'
import type { AsyncState } from '../lib/useAsync'
import { EmptyState } from './EmptyState'
import { ErrorState } from './ErrorState'
import { LoadingState } from './LoadingState'

interface AsyncViewProps<T> {
  state: AsyncState<T>
  children: (data: T) => ReactNode
  onRetry?: () => void
  /** Своё отображение загрузки, например скелетоны */
  loading?: ReactNode
  /** Когда данные считаются пустыми */
  isEmpty?: (data: T) => boolean
  empty?: ReactNode
  /** Своё отображение ошибки; если вернуть undefined — покажется стандартное */
  renderError?: (error: Error) => ReactNode
}

/** Единое отображение состояний экрана с данными: загрузка → ошибка / пусто / данные */
export function AsyncView<T>({ state, children, onRetry, loading, isEmpty, empty, renderError }: AsyncViewProps<T>) {
  if (state.status === 'loading') return loading ?? <LoadingState />

  if (state.status === 'error') {
    return renderError?.(state.error) ?? <ErrorState message={state.error.message} onRetry={onRetry} />
  }

  if (isEmpty?.(state.data)) return empty ?? <EmptyState title="Здесь пока пусто" />

  return (
    <Fade in>
      <Box>{children(state.data)}</Box>
    </Fade>
  )
}