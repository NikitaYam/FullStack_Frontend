import { Link } from 'react-router-dom'
import { Box, Button, Stack, Typography } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutlined'
import { PostCard, postApi } from '@/entities/post'
import { CreatePostForm } from '@/features/post-create'
import { LikeButton } from '@/features/post-like'
import { routes } from '@/shared/config/routes'
import { useAsync } from '@/shared/lib'
import { AnimatedList, AsyncView, EmptyState } from '@/shared/ui'

export default function SocialPage() {
  const { state, reload, setData } = useAsync(postApi.getFeed)

  return (
    <Stack spacing={3} sx={{ maxWidth: 640 }}>
      <Typography variant="h4">Лента читателей</Typography>

      <CreatePostForm onCreated={(post) => setData((prev) => [post, ...prev])} />

      <AsyncView state={state} onRetry={reload}>
        {(posts) => (
          <Box>
            {posts.length === 0 && <EmptyState title="В ленте пока пусто" description="Напишите первый пост!" />}
            <AnimatedList
              items={posts}
              getKey={(post) => post.id}
              renderItem={(post) => (
                <PostCard
                  post={post}
                  actions={
                    <>
                      <LikeButton
                        postId={post.id}
                        likes={post.likes}
                        likedByMe={post.likedByMe}
                        onChange={(like) =>
                          setData((prev) => prev.map((item) => (item.id === post.id ? { ...item, ...like } : item)))
                        }
                      />
                      <Button
                        size="small"
                        startIcon={<ChatBubbleOutlineIcon />}
                        component={Link}
                        to={routes.post(post.id)}
                      >
                        {post.commentsCount}
                      </Button>
                    </>
                  }
                />
              )}
            />
          </Box>
        )}
      </AsyncView>
    </Stack>
  )
}
