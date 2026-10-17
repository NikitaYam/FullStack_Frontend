import { Link } from 'react-router-dom'
import { Button, List, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { chatApi } from '@/entities/chat'
import { UserAvatar } from '@/entities/user'
import { routes } from '@/shared/config/routes'
import { useAsync } from '@/shared/lib'
import { AsyncView, EmptyState } from '@/shared/ui'

export default function ChatsPage() {
  const { state, reload } = useAsync(chatApi.getDialogs)

  return (
    <Stack spacing={2} sx={{ maxWidth: 480 }}>
      <Typography variant="h4">Чаты</Typography>

      <AsyncView
        state={state}
        onRetry={reload}
        isEmpty={(dialogs) => dialogs.length === 0}
        empty={
          <EmptyState
            title="Диалогов пока нет"
            description="Найдите читателя в ленте и напишите ему из профиля."
            action={
              <Button variant="outlined" component={Link} to={routes.social}>
                Перейти в ленту
              </Button>
            }
          />
        }
      >
        {(dialogs) => (
          <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
            {dialogs.map(({ companion, lastMessage }) => (
              <ListItemButton key={companion.id} component={Link} to={routes.chat(companion.id)} divider>
                <ListItemAvatar>
                  <UserAvatar user={companion} />
                </ListItemAvatar>
                <ListItemText
                  primary={companion.name}
                  secondary={`${lastMessage.fromMe ? 'Вы: ' : ''}${lastMessage.text}`}
                  slotProps={{ secondary: { noWrap: true } }}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </AsyncView>
    </Stack>
  )
}
