import { db, nextId, toUserBrief } from '@/mocks/db'
import { mockRequest } from '@/shared/api'
import type { Dialog, Message } from '../model/types'

const toMessage = ({ id, fromMe, text }: (typeof db.messages)[number]): Message => ({ id, fromMe, text })

export const chatApi = {
  getDialogs: (): Promise<Dialog[]> =>
    mockRequest(() => {
      const lastByCompanion = new Map<string, Message>()
      for (const message of db.messages) lastByCompanion.set(message.companionId, toMessage(message))
      return [...lastByCompanion].map(([companionId, lastMessage]) => ({
        companion: toUserBrief(companionId),
        lastMessage,
      }))
    }),

  getMessages: (companionId: string): Promise<Message[]> =>
    mockRequest(() => db.messages.filter((message) => message.companionId === companionId).map(toMessage)),

  send: (companionId: string, text: string): Promise<Message> =>
    mockRequest(() => {
      const record = { id: nextId('m'), companionId, fromMe: true, text: text.trim() }
      db.messages.push(record)
      return toMessage(record)
    }),
}
