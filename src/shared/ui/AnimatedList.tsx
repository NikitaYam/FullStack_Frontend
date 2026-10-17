import { Box, Collapse } from '@mui/material'
import type { ReactNode } from 'react'
import { TransitionGroup } from 'react-transition-group'

interface AnimatedListProps<T> {
  items: T[]
  getKey: (item: T) => string
  renderItem: (item: T) => ReactNode
  /** Отступ между элементами (в единицах темы MUI) */
  spacing?: number
}

/** Список, в котором добавленные и удалённые элементы плавно раскрываются и схлопываются */
export function AnimatedList<T>({ items, getKey, renderItem, spacing = 2 }: AnimatedListProps<T>) {
  return (
    <TransitionGroup component={null}>
      {items.map((item) => (
        <Collapse key={getKey(item)}>
          <Box sx={{ pb: spacing }}>{renderItem(item)}</Box>
        </Collapse>
      ))}
    </TransitionGroup>
  )
}