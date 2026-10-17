import { Divider, Stack, Typography } from '@mui/material'
import { userApi } from '@/entities/user'
import { AccountSettingsForm } from '@/features/account-settings'
import { LogoutButton } from '@/features/auth'
import { useAsync } from '@/shared/lib'
import { AsyncView } from '@/shared/ui'

export default function SettingsPage() {
  const { state, reload } = useAsync(userApi.getSettings)

  return (
    <Stack spacing={3} sx={{ maxWidth: 500 }}>
      <Typography variant="h4">Настройки</Typography>

      <AsyncView state={state} onRetry={reload}>
        {(settings) => <AccountSettingsForm initialSettings={settings} />}
      </AsyncView>

      <Divider />
      <Stack direction="row">
        <LogoutButton />
      </Stack>
    </Stack>
  )
}
