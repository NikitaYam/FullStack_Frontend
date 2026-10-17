import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { chatApi, MessageBubble } from '@/entities/chat'
import { UserAvatar, UserLink, userApi } from '@/entities/user'
import { SendMessageForm } from '@/features/send-message'
import { isNotFoundError } from '@/shared/api'
import { useAsync } from '@/shared/lib'
import { AnimatedList, AsyncView, EmptyState } from '@/shared/ui'
import NotFoundPage from './NotFoundPage'

export default function ChatPage() {
  const { userId = '' } = useParams()

  const loadChat = useCallback(async () => {
    const [companion, messages] = await Promise.all([userApi.getById(userId), chatApi.getMessages(userId)])
    return { companion, messages }
  }, [userId])
  const { state, reload, setData } = useAsync(loadChat)

  return (
    <AsyncView
      state={state}
      onRetry={reload}
      renderError={(error) => (isNotFoundError(error) ? <NotFoundPage /> : undefined)}
    >
      {({ companion, messages }) => (
        <Stack spacing={2} sx={{ maxWidth: 560, height: '75vh' }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <UserAvatar user={companion} />
            <UserLink user={companion} variant="h6" />
          </Stack>

          {/* column-reverse держит прокрутку внизу: новые сообщения всегда видны */}
          <Paper
            variant="outlined"
            sx={{ flexGrow: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' }}
          >
            <Box>
              {messages.length === 0 && <EmptyState title="Сообщений пока нет" description="Напишите первым!" />}
              <AnimatedList
                items={messages}
                getKey={(message) => message.id}
                spacing={1}
                renderItem={(message) => (
                  <MessageBubble outgoing={message.fromMe}>
                    <Typography variant="body2">{message.text}</Typography>
                  </MessageBubble>
                )}
              />
            </Box>
          </Paper>

          <SendMessageForm
            companionId={companion.id}
            onSent={(message) => setData((prev) => ({ ...prev, messages: [...prev.messages, message] }))}
          />
        </Stack>
      )}
    </AsyncView>
  )
}
