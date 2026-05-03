import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { pathname } = useLocation()

  const links = [
    { to: '/album', label: 'Álbum' },
    { to: '/mi-qr', label: 'Mi QR' },
    { to: '/escanear', label: 'Escanear' },
  ]

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link to="/" className="font-bold text-lg text-yellow-400 tracking-tight">
          ⚽ Figuritas 2026
        </Link>

        {user && (
          <div className="flex items-center gap-1">
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  pathname === to
                    ? 'bg-yellow-400 text-gray-900'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={signOut}
              className="ml-2 px-3 py-1.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              Salir
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
