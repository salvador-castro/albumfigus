import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Navbar from './components/layout/Navbar'
import Login from './pages/Login'
import Album from './pages/Album'
import MyQR from './pages/MyQR'
import Scanner from './pages/Scanner'
import Match from './pages/Match'
import Admin from './pages/Admin'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen text-gray-400">Cargando...</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  const { user, loading } = useAuth()

  if (loading) return <div className="flex items-center justify-center h-screen text-gray-400">Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to={user ? '/album' : '/login'} replace />} />
        <Route path="/album" element={<ProtectedRoute><Album /></ProtectedRoute>} />
        <Route path="/mi-qr" element={<ProtectedRoute><MyQR /></ProtectedRoute>} />
        <Route path="/escanear" element={<ProtectedRoute><Scanner /></ProtectedRoute>} />
        <Route path="/match/:userId" element={<ProtectedRoute><Match /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
