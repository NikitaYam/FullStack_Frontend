import type { Book, Chapter, DiaryEntry, DiaryLogEntry, User,  ReadingStatus, Review, Chat, Post} from '../types'

export const currentUserId = 'u1'

export const books: Book[] = [
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
    description:
      'Как человек стал доминирующим видом на планете: от когнитивной революции до современности.',
    color: '#ef6c00',
  },
  {
    id: 'b6',
    title: 'Гарри Поттер и философский камень',
    author: 'Дж. К. Роулинг',
    genre: 'Фэнтези',
    year: 1997,
    rating: 4.8,
    description:
      'Мальчик-сирота узнаёт, что он волшебник, и отправляется учиться в школу чародейства Хогвартс.',
    color: '#6a1b9a',
  },
  {
    id: 'b7',
    title: 'Убийство в «Восточном экспрессе»',
    author: 'Агата Кристи',
    genre: 'Детектив',
    year: 1934,
    rating: 4.6,
    description:
      'Поезд застревает в снегах, а один из пассажиров найден убитым. Эркюль Пуаро начинает расследование.',
    color: '#2e7d32',
  },
  {
    id: 'b8',
    title: 'Гордость и предубеждение',
    author: 'Джейн Остин',
    genre: 'Роман',
    year: 1813,
    rating: 4.6,
    description:
      'Остроумная история о любви, семейных ожиданиях и социальных предрассудках в английской провинции.',
    color: '#ad1457',
  },
]

export const users: User[] = [
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

export const diary: DiaryEntry[] = [
  {
    bookId: 'b1',
    status: 'reading',
    progress: 40,
    rating: 0,
    notes: 'Очень нравится сатира на московскую жизнь.',
    quotes: ['Рукописи не горят.'],
  },
  {
    bookId: 'b3',
    status: 'done',
    progress: 100,
    rating: 5,
    notes: 'Тяжёлая, но очень сильная книга.',
    quotes: [],
  },
  {
    bookId: 'b4',
    status: 'want',
    progress: 0,
    rating: 0,
    notes: '',
    quotes: [],
  },
]

export const statusLabels: Record<ReadingStatus, string> = {
  want: 'Хочу почитать',
  reading: 'Читаю',
  done: 'Проочитано',
}

export const reviews: Review[] = [
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
  {
    id: 'r3',
    bookId: 'b3',
    authorId: 'u3',
    rating: 5,
    text: 'Мрачно, но книга, которую стоит прочитать каждому.',
  },
  {
    id: 'r4',
    bookId: 'b4',
    authorId: 'u4',
    rating: 5,
    text: 'Простая сказка, после которой хочется звонить близким.',
  },
]

export const chapters: Chapter[] = [
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

export const posts: Post[] = [
  {
    id: 'p1',
    authorId: 'u2',
    bookId: 'b6',
    text: 'Начала перечитывать «Гарри Поттера» перед выходом нового фильма. Первая книга всё ещё держит магию!',
    likes: 4,
    comments: [{ id: 'c1', authorId: 'u1', text: 'Обожаю эту серию, тоже пересматриваю фильмы.' }],
  },
  {
    id: 'p2',
    authorId: 'u3',
    bookId: 'b3',
    text: 'Дочитал «1984». Тяжело, но однозначно того стоило.',
    likes: 7,
    comments: [],
  },
  {
    id: 'p3',
    authorId: 'u4',
    text: 'Кто-нибудь может посоветовать лёгкий роман на выходные? Устала от тяжёлой классики.',
    likes: 2,
    comments: [{ id: 'c2', authorId: 'u2', text: 'Попробуй «Гордость и предубеждение», она довольно лёгкая.' }],
  },
]

export const chats: Chat[] = [
  {
    id: 'u2',
    userId: 'u2',
    messages: [
      { id: 'm1', fromMe: false, text: 'Привет! Как тебе «Мастер и Маргарита»?' },
      { id: 'm2', fromMe: true, text: 'Только начал, но уже очень нравится!' },
    ],
  },
  {
    id: 'u3',
    userId: 'u3',
    messages: [
      { id: 'm3', fromMe: false, text: 'Читал что-то из антиутопий в последнее время?' },
      { id: 'm4', fromMe: true, text: 'Да, только закончил «1984».' },
      { id: 'm5', fromMe: false, text: 'И как впечатления?' },
    ],
  },
]

export const diaryLog: DiaryLogEntry[] = [
  {
    id: 'dl1',
    bookId: 'b1',
    date: '10 сентября',
    text: 'Начал читать, очень понравилось начало и атмосфера Москвы 30-х годов.',
  },
  {
    id: 'dl2',
    bookId: 'b1',
    date: '15 сентября',
    text: 'Дошёл до линии Пилата — она куда серьёзнее, чем я ожидал.',
  },
  {
    id: 'dl3',
    bookId: 'b3',
    date: '20 августа',
    text: 'Дочитал за один вечер. Тяжёлое, но очень сильное произведение.',
  },
]

export function getDiaryLogEntries(bookId: string): DiaryLogEntry[] {
  return diaryLog.filter((entry) => entry.bookId === bookId)
}

export function getPost(id: string): Post | undefined {
  return posts.find((post) => post.id === id)
}

export function getChat(userId: string) : Chat | undefined {
  return chats.find((chat) => chat.userId === userId)
}

export function getBook(id: string): Book | undefined {
  return books.find((book) => book.id === id)
}

export function getUser(id: string): User | undefined {
  return users.find((user) => user.id === id)
}