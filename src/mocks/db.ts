import type { Book, BookBrief, Chapter } from '@/entities/book'
import type { ReadingStatus } from '@/entities/diary'
import type { User, UserBrief } from '@/entities/user'

interface DiaryEntryRecord {
  bookId: string
  status: ReadingStatus
  progress: number
  rating: number | null
}

interface DiaryLogRecord {
  id: string
  bookId: string
  date: string
  text: string
}

interface ReviewRecord {
  id: string
  bookId: string
  authorId: string
  rating: number
  text: string
}

interface PostRecord {
  id: string
  authorId: string
  bookId: string | null
  text: string
  likedBy: string[]
}

interface CommentRecord {
  id: string
  postId: string
  authorId: string
  text: string
}

interface MessageRecord {
  id: string
  companionId: string
  fromMe: boolean
  text: string
}

interface AccountRecord {
  email: string
  notifyMessages: boolean
  notifyRecommendations: boolean
  publicDiary: boolean
}

const books: Book[] = [
  {
    id: 'b1',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    genre: 'Роман',
    year: 1967,
    rating: 4.8,
    description:
      'В Москву приезжает загадочный профессор чёрной магии, и привычная жизнь города переворачивается. Параллельно разворачивается история Понтия Пилата.',
    color: '#5d4037',
  },
  {
    id: 'b2',
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    genre: 'Роман',
    year: 1866,
    rating: 4.7,
    description:
      'Бедный студент Раскольников совершает преступление и пытается оправдать его теорией, но совесть не даёт ему покоя.',
    color: '#37474f',
  },
  {
    id: 'b3',
    title: '1984',
    author: 'Джордж Оруэлл',
    genre: 'Антиутопия',
    year: 1949,
    rating: 4.7,
    description:
      'Мир под тотальным контролем Партии, где даже мысли могут быть преступлением. История человека, решившегося на сопротивление.',
    color: '#b71c1c',
  },
  {
    id: 'b4',
    title: 'Маленький принц',
    author: 'Антуан де Сент-Экзюпери',
    genre: 'Сказка',
    year: 1943,
    rating: 4.9,
    description:
      'Лётчик, потерпевший аварию в пустыне, встречает мальчика с далёкой планеты. Философская сказка о дружбе и ответственности.',
    color: '#1565c0',
  },
  {
    id: 'b5',
    title: 'Sapiens. Краткая история человечества',
    author: 'Юваль Ной Харари',
    genre: 'Научпоп',
    year: 2011,
    rating: 4.5,
    description: 'Как человек стал доминирующим видом на планете: от когнитивной революции до современности.',
    color: '#ef6c00',
  },
  {
    id: 'b6',
    title: 'Гарри Поттер и философский камень',
    author: 'Дж. К. Роулинг',
    genre: 'Фэнтези',
    year: 1997,
    rating: 4.8,
    description: 'Мальчик-сирота узнаёт, что он волшебник, и отправляется учиться в школу чародейства Хогвартс.',
    color: '#6a1b9a',
  },
  {
    id: 'b7',
    title: 'Убийство в «Восточном экспрессе»',
    author: 'Агата Кристи',
    genre: 'Детектив',
    year: 1934,
    rating: 4.6,
    description: 'Поезд застревает в снегах, а один из пассажиров найден убитым. Эркюль Пуаро начинает расследование.',
    color: '#2e7d32',
  },
  {
    id: 'b8',
    title: 'Гордость и предубеждение',
    author: 'Джейн Остин',
    genre: 'Роман',
    year: 1813,
    rating: 4.6,
    description: 'Остроумная история о любви, семейных ожиданиях и социальных предрассудках в английской провинции.',
    color: '#ad1457',
  },
]

// Демо-текст одинаков для всех книг; настоящие главы придут с сервера
const chapters: Chapter[] = [
  {
    title: 'Глава 1. Начало',
    paragraphs: [
      'Утро выдалось тихим. Город ещё не проснулся, и только редкие окна светились жёлтым светом в предрассветной синеве.',
      'Он долго стоял у окна, обдумывая всё, что произошло накануне. Мысли путались, но одно он знал наверняка: назад дороги нет.',
      'Наконец, взяв старый потёртый портфель, он вышел на лестницу и осторожно прикрыл за собой дверь.',
    ],
  },
  {
    title: 'Глава 2. Дорога',
    paragraphs: [
      'Дорога к вокзалу заняла больше времени, чем он рассчитывал. Трамваи ходили редко, а пешком идти было далеко.',
      'На перроне уже собирались первые пассажиры. Кто-то читал газету, кто-то пил горячий чай из бумажного стаканчика.',
      'Когда подошёл поезд, он занял место у окна и впервые за долгое время почувствовал, что может выдохнуть.',
    ],
  },
  {
    title: 'Глава 3. Встреча',
    paragraphs: [
      'Напротив сидела женщина с толстой книгой в потёртом переплёте. Она не подняла глаз, но чуть заметно улыбнулась.',
      'Разговор завязался сам собой: сначала о погоде, потом о книгах, а потом о том, что бывает важнее и того и другого.',
      'К концу пути он понял, что эта случайная встреча изменит многое, хотя тогда ещё не мог сказать, что именно.',
    ],
  },
]

const users: User[] = [
  {
    id: 'u1',
    name: 'Никита',
    bio: 'Читаю по вечерам, люблю классику и научпоп.',
    booksRead: 12,
    favoriteGenres: ['Роман', 'Научпоп'],
  },
  {
    id: 'u2',
    name: 'Анна',
    bio: 'Фэнтези и детективы. Всегда ищу, что почитать дальше.',
    booksRead: 48,
    favoriteGenres: ['Фэнтези', 'Детектив'],
  },
  {
    id: 'u3',
    name: 'Дмитрий',
    bio: 'Антиутопии, научная фантастика и история.',
    booksRead: 31,
    favoriteGenres: ['Антиутопия', 'Научпоп'],
  },
  {
    id: 'u4',
    name: 'Мария',
    bio: 'Классическая литература и сказки.',
    booksRead: 27,
    favoriteGenres: ['Роман', 'Сказка'],
  },
]

const account: AccountRecord = {
  email: 'reader@example.com',
  notifyMessages: true,
  notifyRecommendations: true,
  publicDiary: false,
}

const diaryEntries: DiaryEntryRecord[] = [
  { bookId: 'b1', status: 'reading', progress: 40, rating: null },
  { bookId: 'b3', status: 'done', progress: 100, rating: 5 },
  { bookId: 'b4', status: 'want', progress: 0, rating: null },
]

const diaryLog: DiaryLogRecord[] = [
  {
    id: 'dl1',
    bookId: 'b1',
    date: '2026-09-15',
    text: 'Дошёл до линии Пилата — она куда серьёзнее, чем я ожидал.',
  },
  {
    id: 'dl2',
    bookId: 'b1',
    date: '2026-09-10',
    text: 'Начал читать, очень понравилось начало и атмосфера Москвы 30-х годов.',
  },
  {
    id: 'dl3',
    bookId: 'b3',
    date: '2026-08-20',
    text: 'Дочитал за один вечер. Тяжёлое, но очень сильное произведение.',
  },
]

const reviews: ReviewRecord[] = [
  {
    id: 'r1',
    bookId: 'b1',
    authorId: 'u2',
    rating: 5,
    text: 'Перечитываю уже в третий раз и каждый раз нахожу что-то новое.',
  },
  {
    id: 'r2',
    bookId: 'b1',
    authorId: 'u3',
    rating: 4,
    text: 'Очень необычная композиция. Линия Пилата понравилась больше всего.',
  },
  { id: 'r3', bookId: 'b3', authorId: 'u3', rating: 5, text: 'Мрачно, но книга, которую стоит прочитать каждому.' },
  { id: 'r4', bookId: 'b4', authorId: 'u4', rating: 5, text: 'Простая сказка, после которой хочется звонить близким.' },
]

const posts: PostRecord[] = [
  {
    id: 'p1',
    authorId: 'u2',
    bookId: 'b6',
    text: 'Начала перечитывать «Гарри Поттера» перед выходом нового фильма. Первая книга всё ещё держит магию!',
    likedBy: ['u3', 'u4'],
  },
  {
    id: 'p2',
    authorId: 'u3',
    bookId: 'b3',
    text: 'Дочитал «1984». Тяжело, но однозначно того стоило.',
    likedBy: ['u1', 'u2', 'u4'],
  },
  {
    id: 'p3',
    authorId: 'u4',
    bookId: null,
    text: 'Кто-нибудь может посоветовать лёгкий роман на выходные? Устала от тяжёлой классики.',
    likedBy: ['u2'],
  },
]

const comments: CommentRecord[] = [
  { id: 'c1', postId: 'p1', authorId: 'u1', text: 'Обожаю эту серию, тоже пересматриваю фильмы.' },
  { id: 'c2', postId: 'p3', authorId: 'u2', text: 'Попробуй «Гордость и предубеждение», она довольно лёгкая.' },
]

const messages: MessageRecord[] = [
  { id: 'm1', companionId: 'u2', fromMe: false, text: 'Привет! Как тебе «Мастер и Маргарита»?' },
  { id: 'm2', companionId: 'u2', fromMe: true, text: 'Только начал, но уже очень нравится!' },
  { id: 'm3', companionId: 'u3', fromMe: false, text: 'Читал что-то из антиутопий в последнее время?' },
  { id: 'm4', companionId: 'u3', fromMe: true, text: 'Да, только закончил «1984».' },
  { id: 'm5', companionId: 'u3', fromMe: false, text: 'И как впечатления?' },
]

export const db = {
  books,
  chapters,
  users,
  account,
  diaryEntries,
  diaryLog,
  reviews,
  posts,
  comments,
  messages,
}

let idCounter = 100

export function nextId(prefix: string): string {
  idCounter += 1
  return `${prefix}${idCounter}`
}

// Вспомогательные «джойны», как их сделал бы сервер

export function toUserBrief(userId: string): UserBrief {
  const user = users.find((item) => item.id === userId)
  return { id: userId, name: user?.name ?? 'Неизвестный читатель' }
}

export function toBookBrief(bookId: string): BookBrief {
  const book = books.find((item) => item.id === bookId)
  if (!book) return { id: bookId, title: 'Книга удалена', author: '', genre: '', color: '#888888' }
  return { id: book.id, title: book.title, author: book.author, genre: book.genre, color: book.color }
}