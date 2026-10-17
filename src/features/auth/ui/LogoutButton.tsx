import { Button } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/shared/config/routes'

export function LogoutButton() {
  const navigate = useNavigate()

  // В ЛР №4 здесь добавится очистка токенов и отзыв refresh token на сервере
  const handleLogout = () => navigate(routes.hello)

  return (
    <Button color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
      Выйти
    </Button>
  )
}
