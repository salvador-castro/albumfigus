import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function ConfirmEmailModal({ email, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm text-center">
        <div className="w-14 h-14 bg-yellow-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">Confirmá tu email</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-1">
          Te enviamos un mail a
        </p>
        <p className="text-yellow-400 font-medium text-sm mb-4 break-all">{email}</p>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Revisá tu bandeja de entrada y hacé clic en el enlace para activar tu cuenta.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-yellow-400 text-gray-900 font-bold py-2.5 rounded-xl hover:bg-yellow-300 transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  )
}

export default function Login() {
  const { user, signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth()
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [registeredEmail, setRegisteredEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (user) return <Navigate to="/album" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (mode === 'login') {
        const { error } = await signInWithEmail(email, password)
        if (error) throw error
      } else {
        const { error } = await signUpWithEmail(email, password)
        if (error) throw error
        setRegisteredEmail(email)
        setShowConfirmModal(true)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      {showConfirmModal && (
        <ConfirmEmailModal
          email={registeredEmail}
          onClose={() => {
            setShowConfirmModal(false)
            setMode('login')
            setEmail('')
            setPassword('')
          }}
        />
      )}

      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <img
              src="/logoMundial2026.jpg"
              alt="FIFA World Cup 2026"
              className="w-24 h-24 mx-auto mb-3 object-contain"
            />
            <h1 className="text-2xl font-bold text-white">Figuritas 2026</h1>
            <p className="text-gray-400 text-sm mt-1">Mundial USA · Canadá · México</p>
          </div>

          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-medium py-2.5 rounded-xl hover:bg-gray-100 transition-colors mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuar con Google
          </button>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-gray-600 text-xs">o con email</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="bg-yellow-400 text-gray-900 font-bold py-2.5 rounded-xl hover:bg-yellow-300 transition-colors disabled:opacity-50"
            >
              {mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </button>
          </form>

          <button
            onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null) }}
            className="w-full mt-3 text-gray-400 text-sm hover:text-white transition-colors"
          >
            {mode === 'login' ? '¿No tenés cuenta? Registrate' : '¿Ya tenés cuenta? Iniciá sesión'}
          </button>
        </div>
      </div>
    </>
  )
}
