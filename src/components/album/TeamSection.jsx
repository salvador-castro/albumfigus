import { useState } from 'react'
import StickerCard from './StickerCard'
import { getTeamStickers } from '../../data/albumData'

export default function TeamSection({ team, collection, onIncrement, onDecrement }) {
  const stickers = getTeamStickers(team.code)
  const owned = stickers.filter((s) => (collection[s.id] ?? 0) >= 1).length
  const total = stickers.length
  const [imgError, setImgError] = useState(false)

  return (
    <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {team.logo && !imgError ? (
            <img
              src={team.logo}
              alt={team.name}
              className="w-8 h-8 object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="text-2xl">{team.flag}</span>
          )}
          <span className="font-semibold text-sm text-white">{team.name}</span>
        </div>
        <span className="text-xs text-gray-400">{owned}/{total}</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {stickers.map((s) => (
          <StickerCard
            key={s.id}
            label={s.label}
            count={collection[s.id] ?? 0}
            onIncrement={() => onIncrement(s.id)}
            onDecrement={() => onDecrement(s.id)}
          />
        ))}
      </div>
    </div>
  )
}
