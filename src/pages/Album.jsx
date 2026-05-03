import { useState } from 'react'
import { useCollection } from '../hooks/useCollection'
import { GROUPS, SPECIAL_STICKERS, COCA_COLA_STICKERS, getAllStickerIds } from '../data/albumData'
import TeamSection from '../components/album/TeamSection'
import CategorySection from '../components/album/CategorySection'

const FILTERS = ['Todas', 'Tengo', 'Me faltan', 'Repetidas']

export default function Album() {
  const { collection, loading, toggle } = useCollection()
  const [filter, setFilter] = useState('Todas')
  const [search, setSearch] = useState('')

  const totalStickers = getAllStickerIds().length
  const totalOwned = Object.keys(collection).filter((id) => (collection[id] ?? 0) >= 1).length
  const totalDuplicates = Object.keys(collection).filter((id) => (collection[id] ?? 0) >= 2).length
  const totalMissing = totalStickers - totalOwned
  const pct = Math.round((totalOwned / totalStickers) * 100)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Cargando álbum...
      </div>
    )
  }

  const filteredCollection = (id) => {
    const count = collection[id] ?? 0
    if (filter === 'Tengo') return count >= 1
    if (filter === 'Me faltan') return count === 0
    if (filter === 'Repetidas') return count >= 2
    return true
  }

  const teamVisible = (team) => {
    if (search) return team.name.toLowerCase().includes(search.toLowerCase()) || team.code.toLowerCase().includes(search.toLowerCase())
    return true
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">Mi Álbum</h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
          <span className="text-green-400 font-medium">{totalOwned} tengo</span>
          <span className="text-red-400 font-medium">{totalMissing} me faltan</span>
          <span className="text-yellow-400 font-medium">{totalDuplicates} repetidas</span>
          <span>{pct}% completo</span>
        </div>
        <div className="bg-gray-800 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === f ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
        <input
          type="text"
          placeholder="Buscar equipo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto bg-gray-800 border border-gray-700 rounded-full px-4 py-1 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
        />
      </div>

      <div className="space-y-6">
        {filter !== 'Tengo' && filter !== 'Me faltan' && filter !== 'Repetidas' && (
          <>
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Especiales</h2>
              <CategorySection
                title="FWC + 00"
                stickers={SPECIAL_STICKERS}
                collection={collection}
                onToggle={toggle}
              />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Coca Cola</h2>
              <CategorySection
                title="Coca Cola"
                stickers={COCA_COLA_STICKERS}
                collection={collection}
                onToggle={toggle}
              />
            </div>
          </>
        )}

        {GROUPS.map((group) => {
          const visibleTeams = group.teams.filter(teamVisible)
          if (visibleTeams.length === 0) return null
          return (
            <div key={group.name}>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                {group.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {visibleTeams.map((team) => (
                  <TeamSection
                    key={team.code}
                    team={team}
                    collection={collection}
                    onToggle={toggle}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-center text-gray-600 text-xs mt-8">
        Tocá una figurita para marcarla como poseída. Tocá de nuevo para marcarla como repetida. Una vez más para quitarla.
      </p>
    </div>
  )
}
