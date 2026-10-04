import {Button, Stack, Typography} from '@mui/material'
import {Link} from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <Stack spacing={2} sx={{ alignItems: 'flex-start'}}>
            <Typography variant="h4">Страница не доступна</Typography>
            <Typography color="text.secondary">Такого адреса нет, либо страница ещё не создана.</Typography>
            <Button variant="contained" component={Link} to="/home">На главную</Button>
        </Stack>
    )
}