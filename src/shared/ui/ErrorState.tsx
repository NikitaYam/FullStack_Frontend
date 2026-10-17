import { Alert, AlertTitle, Button } from '@mui/material'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Alert
      severity="error"
      action={
        onRetry && (
          <Button color="inherit" size="small" onClick={onRetry}>
            Повторить
          </Button>
        )
      }
    >
      <AlertTitle>Ошибка загрузки</AlertTitle>
      {message}
    </Alert>
  )
}