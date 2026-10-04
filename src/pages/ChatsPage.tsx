import { Link } from 'react-router-dom'
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material'
import { chats, getUser } from '../data/mock'

export default function ChatsPage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Чаты
      </Typography>
      <List sx={{ maxWidth: 480, bgcolor: 'background.paper', borderRadius: 2 }}>
        {chats.map((chat) => {
          const user = getUser(chat.userId)
          const lastMessage = chat.messages[chat.messages.length - 1]
          return (
            <ListItemButton key={chat.id} component={Link} to={`/chats/${chat.userId}`} divider>
              <ListItemAvatar>
                <Avatar>{user?.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user?.name} secondary={lastMessage?.text} />
            </ListItemButton>
          )
        })}
      </List>
    </>
  )
}