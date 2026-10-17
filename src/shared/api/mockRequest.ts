export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404
}

export function getOrThrow<T>(value: T | undefined, message: string): T {
  if (value === undefined) throw new ApiError(message, 404)
  return value
}

const MIN_DELAY_MS = 300
const MAX_DELAY_MS = 800
// Доля запросов, которые завершаются ошибкой (от 0 до 1). Задаётся в .env.local: VITE_MOCK_ERROR_RATE=0.3
const ERROR_RATE = Number(import.meta.env.VITE_MOCK_ERROR_RATE ?? 0)

/**
 * Имитация запроса к серверу: задержка, случайная ошибка сети и копия данных в ответе.
 * В ЛР №5 вызовы mockRequest заменяются настоящими запросами к FastAPI.
 */
export function mockRequest<T>(handler: () => T): Promise<T> {
  const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS)

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < ERROR_RATE) {
        reject(new ApiError('Не удалось связаться с сервером. Попробуйте ещё раз.', 503))
        return
      }
      try {
        resolve(structuredClone(handler()))
      } catch (error) {
        reject(error)
      }
    }, delay)
  })
}