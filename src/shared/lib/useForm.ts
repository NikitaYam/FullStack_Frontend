import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
import { toError } from './useAsync'

export type FormErrors<T> = Partial<Record<keyof T, string>>

type StringKeys<T> = { [K in keyof T]: T[K] extends string ? K : never }[keyof T]

interface UseFormOptions<T> {
  initialValues: T
  validate: (values: T) => FormErrors<T>
  onSubmit: (values: T) => void | Promise<void>
}

/**
 * Состояние формы: значения, клиентская валидация, отправка и ошибка от сервера.
 * Ошибка поля показывается после ухода с поля (blur) или после попытки отправки.
 */
export function useForm<T extends object>({ initialValues, validate, onSubmit }: UseFormOptions<T>) {
  const [initial, setInitial] = useState(initialValues)
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const errors = validate(values)
  const isValid = Object.keys(errors).length === 0
  const isDirty = (Object.keys(values) as (keyof T)[]).some((key) => values[key] !== initial[key])

  const fieldError = (name: keyof T): string | undefined =>
    touched[name] || submitAttempted ? errors[name] : undefined

  const setValue = <K extends keyof T>(name: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setSubmitError(null)
  }

  const touch = (name: keyof T) => setTouched((prev) => ({ ...prev, [name]: true }))

  // Готовые пропсы для текстового поля MUI: значение, обработчики и текст ошибки (или подсказка)
  const textFieldProps = (name: StringKeys<T>, hint?: ReactNode) => ({
    name: String(name),
    value: values[name] as string,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValue(name, event.target.value as T[typeof name]),
    onBlur: () => touch(name),
    error: Boolean(fieldError(name)),
    helperText: fieldError(name) ?? hint,
  })

  const reset = (nextValues: T = initial) => {
    setInitial(nextValues)
    setValues(nextValues)
    setTouched({})
    setSubmitAttempted(false)
    setSubmitError(null)
  }

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault()
    setSubmitAttempted(true)
    if (!isValid || isSubmitting) return

    setIsSubmitting(true)
    setSubmitError(null)
    try {
      await onSubmit(values)
    } catch (error) {
      setSubmitError(toError(error).message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    setValue,
    touch,
    fieldError,
    textFieldProps,
    handleSubmit,
    reset,
    isSubmitting,
    submitError,
    isDirty,
  }
}