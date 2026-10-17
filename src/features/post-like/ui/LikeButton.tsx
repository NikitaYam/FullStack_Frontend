import { useState } from 'react'
import { Button, Zoom } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { postApi } from '@/entities/post'
import type { Post } from '@/entities/post'

type LikeState = Pick<Post, 'likes' | 'likedByMe'>

interface LikeButtonProps {
  postId: string
  likes: number
  likedByMe: boolean
  onChange: (state: LikeState) => void
}

/**
 * Лайк с «оптимистичным» обновлением: счётчик меняется сразу,
 * а при ошибке запроса возвращается прежнее значение.
 */
export function LikeButton({ postId, likes, likedByMe, onChange }: LikeButtonProps) {
  const [pending, setPending] = useState(false)

  const handleClick = async () => {
    if (pending) return
    const previous = { likes, likedByMe }
    onChange({ likes: likedByMe ? likes - 1 : likes + 1, likedByMe: !likedByMe })
    setPending(true)
    try {
      onChange(await postApi.toggleLike(postId))
    } catch {
      onChange(previous)
    } finally {
      setPending(false)
    }
  }

  return (
    <Button
      size="small"
      color={likedByMe ? 'error' : 'primary'}
      onClick={handleClick}
      aria-label={likedByMe ? 'Убрать лайк' : 'Поставить лайк'}
      startIcon={
        // key заставляет Zoom проиграть анимацию при каждом переключении
        <Zoom in key={String(likedByMe)}>
          {likedByMe ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </Zoom>
      }
    >
      {likes}
    </Button>
  )
}
