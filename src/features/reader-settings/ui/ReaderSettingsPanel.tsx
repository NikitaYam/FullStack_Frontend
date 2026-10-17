import { Stack, Slider, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { FONT_SIZE_MAX, FONT_SIZE_MIN, readerThemes } from '../model/readerSettings'
import type { ReaderSettings, ReaderTheme } from '../model/readerSettings'

interface ReaderSettingsPanelProps {
  value: ReaderSettings
  onChange: (value: ReaderSettings) => void
}

export function ReaderSettingsPanel({ value, onChange }: ReaderSettingsPanelProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: { sm: 'center' } }}>
      <Stack sx={{ minWidth: 200 }}>
        <Typography variant="body2">Размер шрифта: {value.fontSize}px</Typography>
        <Slider
          min={FONT_SIZE_MIN}
          max={FONT_SIZE_MAX}
          value={value.fontSize}
          onChange={(_event, fontSize) => onChange({ ...value, fontSize })}
        />
      </Stack>

      <ToggleButtonGroup
        exclusive
        size="small"
        value={value.theme}
        onChange={(_event, theme: ReaderTheme | null) => {
          if (theme) onChange({ ...value, theme })
        }}
      >
        {(Object.keys(readerThemes) as ReaderTheme[]).map((key) => (
          <ToggleButton key={key} value={key}>
            {readerThemes[key].label}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  )
}
