import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

function EditModal({ editingUser, editForm, setEditForm, onSave, onClose, saving }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md p-6">
        <h2 className="text-lg font-bold text-white mb-1">Editar usuario</h2>
        <p className="text-gray-500 text-xs mb-4 break-all">{editingUser.id}</p>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Nombre completo</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400"
              value={editForm.full_name}
              onChange={(e) => setEditForm((f) => ({ ...f, full_name: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Nombre de usuario</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400"
              value={editForm.username}
              onChange={(e) => setEditForm((f) => ({ ...f, username: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email</label>
            <input
              type="email"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400"
              value={editForm.email}
              onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Avatar URL</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-yellow-400"
              value={editForm.avatar_url}
              onChange={(e) => setEditForm((f) => ({ ...f, avatar_url: e.target.value }))}
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="flex gap-2 mt-5 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 text-sm transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 text-sm transition-colors disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Admin() {
  const { user, isAdmin, loading } = useAuth()
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [togglingId, setTogglingId] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState({ full_name: '', username: '', email: '', avatar_url: '' })
  const [savingEdit, setSavingEdit] = useState(false)
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 10

  if (!loading && (!user || !isAdmin)) return <Navigate to="/album" replace />

  const fetchUsers = async () => {
    setLoadingUsers(true)
    const { data, error } = await supabase.rpc('get_all_users_admin')
    if (error) setError(error.message)
    else setUsers(data ?? [])
    setLoadingUsers(false)
  }

  useEffect(() => {
    if (isAdmin) fetchUsers()
  }, [isAdmin])

  const handleDelete = async (targetId, email) => {
    if (targetId === user.id) return alert('No podés eliminarte a vos mismo.')
    if (!confirm(`¿Eliminar al usuario ${email}? Esta acción no se puede deshacer.`)) return
    setDeletingId(targetId)
    const { error } = await supabase.rpc('admin_delete_user', { target_user_id: targetId })
    if (error) alert('Error: ' + error.message)
    else setUsers((prev) => prev.filter((u) => u.id !== targetId))
    setDeletingId(null)
  }

  const handleToggleAdmin = async (targetId, currentValue) => {
    if (targetId === user.id) return alert('No podés modificar tu propio rol.')
    setTogglingId(targetId)
    const { error } = await supabase.rpc('admin_toggle_admin', {
      target_user_id: targetId,
      new_value: !currentValue,
    })
    if (error) alert('Error: ' + error.message)
    else setUsers((prev) => prev.map((u) => u.id === targetId ? { ...u, is_admin: !currentValue } : u))
    setTogglingId(null)
  }

  const openEdit = (u) => {
    setEditingUser(u)
    setEditForm({
      full_name: u.full_name ?? '',
      username: u.username ?? '',
      email: u.email ?? '',
      avatar_url: u.avatar_url ?? '',
    })
  }

  const handleSaveEdit = async () => {
    setSavingEdit(true)
    const { error } = await supabase.rpc('admin_update_user', {
      target_user_id: editingUser.id,
      new_full_name: editForm.full_name,
      new_username: editForm.username,
      new_email: editForm.email,
      new_avatar_url: editForm.avatar_url,
    })
    if (error) {
      alert('Error: ' + error.message)
    } else {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...u, full_name: editForm.full_name, username: editForm.username, email: editForm.email, avatar_url: editForm.avatar_url }
            : u
        )
      )
      setEditingUser(null)
    }
    setSavingEdit(false)
  }

  if (loading || loadingUsers) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Cargando usuarios...</div>
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {editingUser && (
        <EditModal
          editingUser={editingUser}
          editForm={editForm}
          setEditForm={setEditForm}
          onSave={handleSaveEdit}
          onClose={() => setEditingUser(null)}
          saving={savingEdit}
        />
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Panel de Admin</h1>
          <p className="text-gray-400 text-sm">{users.length} usuarios registrados</p>
        </div>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 text-sm transition-colors"
        >
          Actualizar
        </button>
      </div>

      {error && (
        <div className="bg-red-950 border border-red-800 text-red-300 px-4 py-3 rounded-xl mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400 text-left">
              <th className="px-4 py-3">Usuario</th>
              <th className="px-4 py-3 hidden sm:table-cell">Email</th>
              <th className="px-4 py-3 text-center">Figuritas</th>
              <th className="px-4 py-3 text-center">Admin</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((u) => (
              <tr key={u.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-white">{u.full_name || u.username || '—'}</div>
                  <div className="text-gray-500 text-xs sm:hidden">{u.email}</div>
                  <div className="text-gray-600 text-xs">{new Date(u.created_at).toLocaleDateString('es-AR')}</div>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell text-gray-300">{u.email}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-bold ${u.sticker_count > 0 ? 'text-green-400' : 'text-gray-600'}`}>
                    {u.sticker_count}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleToggleAdmin(u.id, u.is_admin)}
                    disabled={togglingId === u.id || u.id === user.id}
                    className={`px-2 py-0.5 rounded-full text-xs font-medium transition-colors disabled:opacity-50 ${
                      u.is_admin
                        ? 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30'
                        : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
                    }`}
                  >
                    {u.is_admin ? 'Admin' : 'User'}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => openEdit(u)}
                      className="px-3 py-1 bg-blue-950 text-blue-400 hover:bg-blue-900 rounded-lg text-xs transition-colors"
                    >
                      Editar
                    </button>
                    {u.id !== user.id && (
                      <button
                        onClick={() => handleDelete(u.id, u.email)}
                        disabled={deletingId === u.id}
                        className="px-3 py-1 bg-red-950 text-red-400 hover:bg-red-900 rounded-lg text-xs transition-colors disabled:opacity-50"
                      >
                        {deletingId === u.id ? '...' : 'Eliminar'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length > PAGE_SIZE && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-500 text-xs">
            Página {page} de {Math.ceil(users.length / PAGE_SIZE)}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 disabled:opacity-40 transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= Math.ceil(users.length / PAGE_SIZE)}
              className="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700 disabled:opacity-40 transition-colors"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
