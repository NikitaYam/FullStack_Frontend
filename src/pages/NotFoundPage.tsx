import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { routes } from '@/shared/config/routes'

export default function NotFoundPage() {
  return (
    <Stack spacing={2} sx={{ alignItems: 'flex-start' }}>
      <Typography variant="h4">Страница не найдена</Typography>
      <Typography color="text.secondary">Такого адреса нет, либо запись была удалена.</Typography>
      <Button variant="contained" component={Link} to={routes.home}>
        На главную
      </Button>
    </Stack>
  )
}
