import { Alert, Collapse } from '@mui/material'
import type { AlertColor } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'

interface FormAlertProps {
  message: string | null | undefined
  severity?: AlertColor
  onClose?: () => void
  sx?: SxProps<Theme>
}

/**
 * Сообщение формы (ошибка сервера, «сохранено»): плавно появляется и исчезает.
 * unmountOnExit убирает скрытый блок из разметки, чтобы он не оставлял пустой отступ в Stack.
 */
export function FormAlert({ message, severity = 'error', onClose, sx }: FormAlertProps) {
  return (
    <Collapse in={Boolean(message)} unmountOnExit>
      <Alert severity={severity} onClose={onClose} sx={sx}>
        {message}
      </Alert>
    </Collapse>
  )
}
