import { chatApi } from '@/entities/chat'
import type { Message } from '@/entities/chat'
import { MessageInput } from '@/shared/ui'

interface SendMessageFormProps {
  companionId: string
  onSent: (message: Message) => void
}

export function SendMessageForm({ companionId, onSent }: SendMessageFormProps) {
  return (
    <MessageInput label="Сообщение" onSend={async (text) => onSent(await chatApi.send(companionId, text))} />
  )
}
