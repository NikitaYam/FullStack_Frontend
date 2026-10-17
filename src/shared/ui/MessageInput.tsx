import { useState } from 'react'
import { IconButton, Stack, TextField, Tooltip } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { toError, validateText } from '../lib'

const MESSAGE_MAX_LENGTH = 1000

interface MessageInputProps {
  label: string
  onSend: (text: string) => void | Promise<void>
  disabled?: boolean
}

/** Поле ввода сообщения: Enter — отправить, Shift+Enter — новая строка */
export function MessageInput({ label, onSend, disabled = false }: MessageInputProps) {
  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  const isBlank = text.trim() === ''

  const send = async () => {
    if (isBlank || sending || disabled) return
    const validationError = validateText(text, { max: MESSAGE_MAX_LENGTH })
    if (validationError) {
      setError(validationError)
      return
    }
    setSending(true)
    try {
      await onSend(text.trim())
      setText('')
    } catch (sendError) {
      setError(toError(sendError).message)
    } finally {
      setSending(false)
    }
  }

  // Счётчик символов показываем, только когда текст подходит к лимиту
  const counter = text.length > MESSAGE_MAX_LENGTH * 0.8 ? `${text.length} / ${MESSAGE_MAX_LENGTH}` : undefined

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: 'flex-start' }}>
      <TextField
        label={label}
        size="small"
        multiline
        maxRows={4}
        value={text}
        onChange={(event) => {
          setText(event.target.value)
          setError(null)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            void send()
          }
        }}
        error={Boolean(error)}
        helperText={error ?? counter}
        disabled={disabled}
        sx={{ flexGrow: 1 }}
      />
      <Tooltip title="Отправить">
        <span>
          <IconButton color="primary" onClick={send} disabled={isBlank || sending || disabled} loading={sending}>
            <SendIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Stack>
  )
}