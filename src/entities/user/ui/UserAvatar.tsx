import { Avatar } from '@mui/material'
import type { UserBrief } from '../model/types'

interface UserAvatarProps {
  user: Pick<UserBrief, 'name'>
  size?: number
}

export function UserAvatar({ user, size = 40 }: UserAvatarProps) {
  return <Avatar sx={{ width: size, height: size, fontSize: size * 0.45 }}>{user.name.charAt(0)}</Avatar>
}
