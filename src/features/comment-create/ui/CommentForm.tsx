import { postApi } from '@/entities/post'
import type { PostComment } from '@/entities/post'
import { MessageInput } from '@/shared/ui'

interface CommentFormProps {
  postId: string
  onCreated: (comment: PostComment) => void
}

export function CommentForm({ postId, onCreated }: CommentFormProps) {
  return (
    <MessageInput
      label="Написать комментарий"
      onSend={async (text) => onCreated(await postApi.addComment(postId, text))}
    />
  )
}
