import type { UserBrief } from '@/entities/user'

export interface Message {
  id: string
  fromMe: boolean
  text: string
}

/** Элемент списка чатов: собеседник и последнее сообщение */
export interface Dialog {
  companion: UserBrief
  lastMessage: Message
}
