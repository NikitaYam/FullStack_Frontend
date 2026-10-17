import { Typography } from '@mui/material'
import type { TypographyProps } from '@mui/material'
import { Link } from 'react-router-dom'
import { routes } from '@/shared/config/routes'
import type { UserBrief } from '../model/types'

interface UserLinkProps {
  user: UserBrief
  variant?: TypographyProps['variant']
}

/** Имя пользователя — ссылка на его профиль */
export function UserLink({ user, variant = 'body1' }: UserLinkProps) {
  return (
    <Typography
      component={Link}
      to={routes.profile(user.id)}
      variant={variant}
      sx={{ color: 'inherit', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
    >
      {user.name}
    </Typography>
  )
}
