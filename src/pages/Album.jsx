import { useState, useEffect } from 'react'
import { useCollection } from '../hooks/useCollection'
import { GROUPS, SPECIAL_STICKERS, COCA_COLA_STICKERS, getAllStickerIds, getTeamStickers } from '../data/albumData'
import TeamSection from '../components/album/TeamSection'
import CategorySection from '../components/album/CategorySection'

const FILTERS = ['Todas', 'Tengo', 'Me faltan', 'Repetidas']

function buildExportText(collection) {
  const lines = ['🃏 Mis repetidas - Mundial 2026\n']

  const fmt = (s) => {
    const c = collection[s.id] ?? 0
    return c > 2 ? `${s.label}(x${c})` : s.label
  }

  const specialReps = SPECIAL_STICKERS.filter((s) => (collection[s.id] ?? 0) >= 2)
  if (specialReps.length > 0) lines.push(`⭐ Especiales: ${specialReps.map(fmt).join(', ')}`)

  const ccReps = COCA_COLA_STICKERS.filter((s) => (collection[s.id] ?? 0) >= 2)
  if (ccReps.length > 0) lines.push(`🥤 Coca Cola: ${ccReps.map(fmt).join(', ')}`)

  for (const group of GROUPS) {
    for (const team of group.teams) {
      const reps = getTeamStickers(team.code).filter((s) => (collection[s.id] ?? 0) >= 2)
      if (reps.length > 0) lines.push(`${team.flag} ${team.name}: ${reps.map(fmt).join(', ')}`)
    }
  }

  const totalUnits = Object.values(collection)
    .filter((c) => c >= 2)
    .reduce((acc, c) => acc + (c - 1), 0)
  lines.push(`\nTotal: ${totalUnits} figuritas repetidas`)
  return lines.join('\n')
}

export default function Album() {
  const { collection, loading, increment, decrement } = useCollection()
  const [filter, setFilter] = useState('Todas')
  const [search, setSearch] = useState('')
  const [showExport, setShowExport] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [filter])

  const totalStickers = getAllStickerIds().length
  const totalOwned = Object.keys(collection).filter((id) => (collection[id] ?? 0) >= 1).length
  const totalDuplicates = Object.keys(collection).filter((id) => (collection[id] ?? 0) >= 2).length
  const totalMissing = totalStickers - totalOwned
  const pct = Math.round((totalOwned / totalStickers) * 100)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildExportText(collection))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    const text = buildExportText(collection)
    if (navigator.share) {
      await navigator.share({ text })
    } else {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Cargando álbum...
      </div>
    )
  }

  const teamVisible = (team) => {
    if (!search) return true
    return team.name.toLowerCase().includes(search.toLowerCase()) || team.code.toLowerCase().includes(search.toLowerCase())
  }

  const showSpecials = filter === 'Todas' || filter === 'Tengo' || filter === 'Me faltan' || filter === 'Repetidas'

  const filterCollection = (stickers) => {
    if (filter === 'Todas') return stickers
    return stickers.filter((s) => {
      const c = collection[s.id] ?? 0
      if (filter === 'Tengo') return c >= 1
      if (filter === 'Me faltan') return c === 0
      if (filter === 'Repetidas') return c >= 2
      return true
    })
  }

  const specialFiltered = filterCollection(SPECIAL_STICKERS)
  const ccFiltered = filterCollection(COCA_COLA_STICKERS)

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <h1 className="text-2xl font-bold text-white">Mi Álbum</h1>
          {totalDuplicates > 0 && (
            <button
              onClick={() => setShowExport(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Exportar repetidas
            </button>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-3 flex-wrap">
          <span className="text-green-400 font-medium">{totalOwned} tengo</span>
          <span className="text-red-400 font-medium">{totalMissing} me faltan</span>
          <span className="text-yellow-400 font-medium">{totalDuplicates} repetidas</span>
          <span>{pct}% completo</span>
        </div>
        <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg,#003DA5,#0052FF,#22C55E,#FFD100,#FF6B00,#EF4444)',
            }}
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

      {showExport && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 px-4 pb-4 sm:pb-0"
          onClick={() => setShowExport(false)}
        >
          <div
            className="bg-gray-900 rounded-2xl w-full max-w-lg border border-gray-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1" style={{ background: 'linear-gradient(90deg,#003DA5,#0052FF,#22C55E,#FFD100,#FF6B00,#EF4444,#8B5CF6,#06B6D4)' }} />
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-white text-lg">Mis repetidas</h2>
                <button onClick={() => setShowExport(false)} className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <pre className="bg-gray-800 rounded-xl p-4 text-sm text-gray-300 whitespace-pre-wrap font-mono max-h-72 overflow-y-auto border border-gray-700">
                {buildExportText(collection)}
              </pre>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCopy}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm bg-gray-800 text-white hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      ¡Copiado!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copiar
                    </>
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Compartir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {!search && specialFiltered.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Especiales</h2>
            <CategorySection
              title="FWC + 00"
              stickers={specialFiltered}
              collection={collection}
              onIncrement={increment}
              onDecrement={decrement}
            />
          </div>
        )}

        {!search && ccFiltered.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Coca Cola</h2>
            <CategorySection
              title="Coca Cola"
              stickers={ccFiltered}
              collection={collection}
              onIncrement={increment}
              onDecrement={decrement}
            />
          </div>
        )}

        {GROUPS.map((group) => {
          const visibleTeams = group.teams.filter(teamVisible)
          if (visibleTeams.length === 0) return null
          return (
            <div key={group.name}>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">{group.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {visibleTeams.map((team) => (
                  <TeamSection
                    key={team.code}
                    team={team}
                    collection={collection}
                    onIncrement={increment}
                    onDecrement={decrement}
                    filterStickers={filterCollection}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <p className="text-center text-gray-600 text-xs mt-8">
        Click para agregar · botón − para quitar una · llegás a repetidas automáticamente
      </p>
    </div>
  )
}
