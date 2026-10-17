import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Chip, Fade, Stack, Typography } from '@mui/material'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import { BookCard, BookGrid } from '@/entities/book'
import type { Book } from '@/entities/book'
import { MessageBubble } from '@/entities/chat'
import {
  loadRecommendationContext,
  recommendByDiary,
  recommendByGenres,
  recommendByQuery,
} from '@/features/recommendations'
import type { RecommendationContext } from '@/features/recommendations'
import { routes } from '@/shared/config/routes'
import { useAsync } from '@/shared/lib'
import { AnimatedList, AsyncView, MessageInput } from '@/shared/ui'

interface AssistantMessage {
  id: string
  fromAssistant: boolean
  text: string
  books?: Book[]
}

type Answer = Pick<AssistantMessage, 'text' | 'books'>

const REPLY_DELAY_MS = 800

const greeting: AssistantMessage = {
  id: 'start',
  fromAssistant: true,
  text: 'Привет! Я помогу подобрать книгу. Выберите вариант ниже или опишите, что хотите почитать.',
}

const quickPrompts: { label: string; answer: (context: RecommendationContext) => Answer }[] = [
  {
    label: 'По любимым жанрам',
    answer: (context) => ({ text: 'Вот книги в ваших любимых жанрах:', books: recommendByGenres(context) }),
  },
  {
    label: 'На основе дневника',
    answer: (context) => ({ text: 'На основе вашего дневника советую попробовать:', books: recommendByDiary(context) }),
  },
]

function answerQuery(context: RecommendationContext, query: string): Answer {
  const books = recommendByQuery(context, query)
  if (books.length > 0) return { text: 'Вот что подходит под ваш запрос:', books }
  return { text: 'По запросу ничего не нашлось. Возможно, понравится что-то из любимых жанров:', books: recommendByGenres(context) }
}

export default function AIAssistantPage() {
  const { state, reload } = useAsync(loadRecommendationContext)
  const [messages, setMessages] = useState<AssistantMessage[]>([greeting])
  const [typing, setTyping] = useState(false)

  // Сообщение пользователя появляется сразу, ответ ассистента — после «раздумий»
  const ask = (question: string, answer: () => Answer) => {
    setMessages((prev) => [...prev, { id: crypto.randomUUID(), fromAssistant: false, text: question }])
    setTyping(true)
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), fromAssistant: true, ...answer() }])
      setTyping(false)
    }, REPLY_DELAY_MS)
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: 700 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <SmartToyIcon color="primary" />
        <Typography variant="h4">ИИ-ассистент</Typography>
      </Stack>

      <AsyncView state={state} onRetry={reload}>
        {(context) => (
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
              {quickPrompts.map((prompt) => (
                <Chip
                  key={prompt.label}
                  label={prompt.label}
                  color="primary"
                  variant="outlined"
                  disabled={typing}
                  onClick={() => ask(prompt.label, () => prompt.answer(context))}
                />
              ))}
            </Stack>

            <Box>
              <AnimatedList
                items={messages}
                getKey={(message) => message.id}
                renderItem={(message) => (
                  <MessageBubble outgoing={!message.fromAssistant}>
                    <Typography>{message.text}</Typography>
                    {message.books && message.books.length > 0 && (
                      <Box sx={{ mt: 2, minWidth: { sm: 400 } }}>
                        <BookGrid>
                          {message.books.map((book) => (
                            <BookCard key={book.id} book={book} />
                          ))}
                        </BookGrid>
                      </Box>
                    )}
                    {message.books?.length === 0 && (
                      <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                        Подходящих книг не нашлось, загляните в{' '}
                        <Box component={Link} to={routes.market} sx={{ color: 'inherit' }}>
                          библиотеку
                        </Box>
                        .
                      </Typography>
                    )}
                  </MessageBubble>
                )}
              />
              <Fade in={typing} unmountOnExit>
                <Typography variant="body2" color="text.secondary">
                  Ассистент печатает…
                </Typography>
              </Fade>
            </Box>

            <MessageInput
              label="Опишите, что хотите почитать"
              disabled={typing}
              onSend={(text) => ask(text, () => answerQuery(context, text))}
            />
          </Stack>
        )}
      </AsyncView>
    </Stack>
  )
}
