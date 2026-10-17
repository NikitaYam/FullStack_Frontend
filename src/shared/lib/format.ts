/** pluralize(3, ['книга', 'книги', 'книг']) → 'книги' */
export function pluralize(count: number, [one, few, many]: [string, string, string]): string {
  const mod10 = count % 10
  const mod100 = count % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

/** '2026-09-10' → '10 сентября 2026 г.' */
export function formatDate(isoDate: string): string {
  // T00:00 — чтобы дата читалась в локальном часовом поясе, а не в UTC
  return new Date(`${isoDate}T00:00`).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/** Сегодняшняя дата в формате YYYY-MM-DD */
export function todayIso(): string {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}