import { useEffect, useState } from 'react'

export type ReaderTheme = 'light' | 'dark' | 'sepia'

export interface ReaderSettings {
  fontSize: number
  theme: ReaderTheme
}

export const FONT_SIZE_MIN = 14
export const FONT_SIZE_MAX = 28

export const readerThemes: Record<ReaderTheme, { label: string; background: string; color: string }> = {
  light: { label: 'Светлая', background: '#ffffff', color: '#222222' },
  dark: { label: 'Тёмная', background: '#1e1e1e', color: '#dddddd' },
  sepia: { label: 'Сепия', background: '#f4ecd8', color: '#5b4636' },
}

const STORAGE_KEY = 'reader-settings'
const defaultSettings: ReaderSettings = { fontSize: 18, theme: 'light' }

function loadSettings(): ReaderSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...defaultSettings, ...(JSON.parse(saved) as Partial<ReaderSettings>) } : defaultSettings
  } catch {
    return defaultSettings
  }
}

/** Настройки читалки, которые запоминаются в браузере между визитами */
export function useReaderSettings() {
  const [settings, setSettings] = useState(loadSettings)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // Хранилище недоступно (например, приватный режим) — настройки просто не сохранятся
    }
  }, [settings])

  return [settings, setSettings] as const
}
