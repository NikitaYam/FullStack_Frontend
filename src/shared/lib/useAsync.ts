import { useEffect, useState } from 'react'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'success'; data: T }

export function toError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error))
}

/**
 * Загружает данные и хранит состояние запроса: загрузка / ошибка / данные.
 * load нужно оборачивать в useCallback — при смене его зависимостей данные загрузятся заново.
 */
export function useAsync<T>(load: () => Promise<T>) {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })
  const [currentLoad, setCurrentLoad] = useState(() => load)
  const [attempt, setAttempt] = useState(0)

  // Сменилась функция загрузки (например, другой id в адресе) — сразу показываем загрузку
  if (currentLoad !== load) {
    setCurrentLoad(() => load)
    setState({ status: 'loading' })
  }

  useEffect(() => {
    let ignore = false
    load().then(
      (data) => {
        if (!ignore) setState({ status: 'success', data })
      },
      (error: unknown) => {
        if (!ignore) setState({ status: 'error', error: toError(error) })
      },
    )
    return () => {
      ignore = true
    }
  }, [load, attempt])

  const reload = () => {
    setState({ status: 'loading' })
    setAttempt((value) => value + 1)
  }

  // Локально обновить уже загруженные данные (например, после добавления отзыва)
  const setData = (update: (data: T) => T) => {
    setState((prev) => (prev.status === 'success' ? { status: 'success', data: update(prev.data) } : prev))
  }

  return { state, reload, setData }
}