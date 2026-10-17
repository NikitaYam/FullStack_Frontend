import { Box } from '@mui/material'
import type { ReactNode } from 'react'

interface MessageBubbleProps {
  /** true — сообщение пользователя (справа), false — собеседника (слева) */
  outgoing: boolean
  children: ReactNode
}

/** «Пузырь» сообщения — общий для чатов и ИИ-ассистента */
export function MessageBubble({ outgoing, children }: MessageBubbleProps) {
  return (
    <Box sx={{ display: 'flex', justifyContent: outgoing ? 'flex-end' : 'flex-start' }}>
      <Box
        sx={{
          bgcolor: outgoing ? 'primary.main' : 'grey.200',
          color: outgoing ? 'primary.contrastText' : 'text.primary',
          borderRadius: 2,
          px: 2,
          py: 1,
          maxWidth: '80%',
          whiteSpace: 'pre-line',
          wordBreak: 'break-word',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
