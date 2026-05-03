import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCollection } from '../hooks/useCollection'
import { ALL_TEAMS, GROUPS, SPECIAL_STICKERS, COCA_COLA_STICKERS } from '../data/albumData'
import clsx from 'clsx'

export default function Match() {
  const { userId } = useParams()
  const { collection: myCollection } = useCollection()
  const [theirCollection, setTheirCollection] = useState({})
  const [theirProfile, setTheirProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data: stickers } = await supabase
        .from('user_stickers')
        .select('sticker_id, count')
        .eq('user_id', userId)

      const { data: profile } = await supabase
        .from('profiles')
        .select('username, full_name')
        .eq('id', userId)
        .single()

      if (stickers) {
        const map = {}
        stickers.forEach(({ sticker_id, count }) => { map[sticker_id] = count })
        setTheirCollection(map)
      }
      setTheirProfile(profile)
      setLoading(false)
    }
    load()
  }, [userId])

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-gray-400">Calculando intercambio...</div>
  }

  // Me sirven a mí: ellos tienen repetidas Y yo no tengo esa figurita
  const usefulForMe = Object.keys(theirCollection)
    .filter((id) => (theirCollection[id] ?? 0) >= 2 && (myCollection[id] ?? 0) === 0)

  // Le sirven a ellos: yo tengo repetidas Y ellos no tienen
  const usefulForThem = Object.keys(myCollection)
    .filter((id) => (myCollection[id] ?? 0) >= 2 && (theirCollection[id] ?? 0) === 0)

  const theirName = theirProfile?.full_name || theirProfile?.username || 'Este usuario'

  const renderStickerList = (ids, label, color) => (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
      <h3 className={clsx('font-bold text-sm mb-3', color)}>
        {label} ({ids.length})
      </h3>
      {ids.length === 0 ? (
        <p className="text-gray-500 text-sm">Ninguna</p>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {ids.map((id) => (
            <span key={id} className="bg-gray-800 text-gray-300 text-xs px-2 py-0.5 rounded-md font-mono">
              {id}
            </span>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-1">Intercambio</h1>
      <p className="text-gray-400 text-sm mb-6">
        Comparando con <span className="text-white font-medium">{theirName}</span>
      </p>

      <div className="grid grid-cols-1 gap-4">
        {renderStickerList(usefulForMe, `Me sirven a mí (las tiene ${theirName} repetidas)`, 'text-green-400')}
        {renderStickerList(usefulForThem, `Le sirven a ${theirName} (las tengo yo repetidas)`, 'text-yellow-400')}
      </div>

      {usefulForMe.length === 0 && usefulForThem.length === 0 && (
        <div className="text-center mt-8 text-gray-500">
          <p className="text-4xl mb-2">🤝</p>
          <p>No hay figuritas útiles para intercambiar en este momento.</p>
        </div>
      )}

      {(usefulForMe.length > 0 || usefulForThem.length > 0) && (
        <div className="mt-6 bg-blue-950 border border-blue-800 rounded-xl p-4 text-sm text-blue-300">
          <strong>Resumen:</strong> Podés pedirle {usefulForMe.length} figuritas y darle {usefulForThem.length} a cambio.
        </div>
      )}
    </div>
  )
}
