import { Chip } from '@mui/material'
import type { ChipProps } from '@mui/material'
import { statusLabels } from '../model/statusLabels'
import type { ReadingStatus } from '../model/types'

const statusColors: Record<ReadingStatus, ChipProps['color']> = {
  want: 'default',
  reading: 'secondary',
  done: 'success',
}

export function ReadingStatusChip({ status }: { status: ReadingStatus }) {
  return <Chip label={statusLabels[status]} color={statusColors[status]} size="small" />
}
