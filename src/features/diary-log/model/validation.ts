import { validateText } from '@/shared/lib'
import type { FormErrors } from '@/shared/lib'

export interface LogEntryFormValues {
  text: string
}

export const LOG_TEXT_MAX_LENGTH = 2000

export function validateLogEntry(values: LogEntryFormValues): FormErrors<LogEntryFormValues> {
  const textError = validateText(values.text, { min: 3, max: LOG_TEXT_MAX_LENGTH })
  return textError ? { text: textError } : {}
}
