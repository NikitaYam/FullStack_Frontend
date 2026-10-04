import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AIAssistantPage from './pages/AIAssistantPage'
import BookDiaryPage from './pages/BookDiaryPage'
import BookMarketPage from './pages/BookMarketPage'
import BookPage from './pages/BookPage'
import ChatPage from './pages/ChatPage'
import ChatsPage from './pages/ChatsPage'
import HelloPage from './pages/HelloPage'
import HomePage from './pages/HomePage'
import LibraryPage from './pages/LibraryPage'
import NotFoundPage from './pages/NotFoundPage'
import PostPage from './pages/PostPage'
import ProfilePage from './pages/ProfilePage'
import ReaderPage from './pages/ReaderPage'
import SettingsPage from './pages/SettingsPage'
import SocialPage from './pages/SocialPage'
import DiaryPage from './pages/DiaryPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloPage />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/diary" element={<DiaryPage />} />
          <Route path="/books/:bookId" element={<BookPage />} />
          <Route path="/books/:bookId/read" element={<ReaderPage />} />
          <Route path="/books/:bookId/diary" element={<BookDiaryPage />} />
          <Route path="/market" element={<BookMarketPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/social/:postId" element={<PostPage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route path="/chats" element={<ChatsPage />} />
          <Route path="/chats/:userId" element={<ChatPage />} />
          <Route path="/assistant" element={<AIAssistantPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}