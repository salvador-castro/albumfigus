import StickerCard from './StickerCard'
import { getTeamStickers } from '../../data/albumData'

export default function TeamSection({ team, collection, onToggle }) {
  const stickers = getTeamStickers(team.code)
  const owned = stickers.filter((s) => (collection[s.id] ?? 0) >= 1).length
  const total = stickers.length

  return (
    <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{team.flag}</span>
          <span className="font-semibold text-sm text-white">{team.name}</span>
        </div>
        <span className="text-xs text-gray-400">
          {owned}/{total}
        </span>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {stickers.map((s) => (
          <StickerCard
            key={s.id}
            stickerId={s.id}
            label={s.label}
            count={collection[s.id] ?? 0}
            onToggle={() => onToggle(s.id)}
          />
        ))}
      </div>
    </div>
  )
}
