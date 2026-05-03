import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function Navbar() {
  const { user, isAdmin, signOut } = useAuth()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  const links = [
    { to: '/album', label: 'Álbum' },
    { to: '/mi-qr', label: 'Mi QR' },
    { to: '/escanear', label: 'Escanear' },
    ...(isAdmin ? [{ to: '/admin', label: 'Admin' }] : []),
  ]

  const close = () => setOpen(false)

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={close}>
          <img src="/logoMundial2026.jpg" alt="Mundial 2026" className="w-8 h-8 object-contain" />
          <span className="font-bold text-lg text-yellow-400 tracking-tight">Figuritas 2026</span>
        </Link>

        {user && (
          <>
            {/* Desktop links */}
            <div className="hidden sm:flex items-center gap-1">
              {links.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
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

            {/* Mobile hamburger button */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Menú"
            >
              <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-gray-300 transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </>
        )}
      </div>

      {/* Mobile dropdown */}
      {user && open && (
        <div className="sm:hidden bg-gray-900 border-t border-gray-800 px-4 pb-4 flex flex-col gap-1">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={close}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === to
                  ? 'bg-yellow-400 text-gray-900'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => { close(); signOut() }}
            className="mt-1 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors text-left"
          >
            Salir
          </button>
        </div>
      )}
    </nav>
  )
}
