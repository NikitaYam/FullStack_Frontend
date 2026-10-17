import { pluralize } from './format'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isEmail = (value: string) => EMAIL_PATTERN.test(value.trim())

interface TextRules {
  required?: boolean
  min?: number
  max: number
}

/** Проверка текстового поля. Возвращает сообщение об ошибке или undefined */
export function validateText(value: string, { required = true, min = 0, max }: TextRules): string | undefined {
  const length = value.trim().length
  if (length === 0) return required ? 'Обязательное поле' : undefined
  if (length < min) return `Минимум ${min} ${pluralize(min, ['символ', 'символа', 'символов'])}`
  if (length > max) return `Не больше ${max} ${pluralize(max, ['символа', 'символов', 'символов'])}`
  return undefined
}