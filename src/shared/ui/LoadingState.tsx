import { Box, CircularProgress, Fade, Typography} from '@mui/material'

interface LoadingStateProps {
    text?: string
}

export function LoadingState({ text = 'Загрузка…' }: LoadingStateProps) {
  return (
    // Небольшая задержка: при быстром ответе индикатор не успевает мигнуть
    <Fade in style={{ transitionDelay: '200ms' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 6 }}>
        <CircularProgress />
        <Typography color="text.secondary">{text}</Typography>
      </Box>
    </Fade>
  )
}