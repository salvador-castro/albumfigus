import StickerCard from './StickerCard'

export default function CategorySection({ title, stickers, collection, onToggle }) {
  const owned = stickers.filter((s) => (collection[s.id] ?? 0) >= 1).length

  return (
    <div className="bg-gray-900 rounded-xl p-3 border border-gray-800">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-sm text-yellow-400">{title}</span>
        <span className="text-xs text-gray-400">{owned}/{stickers.length}</span>
      </div>
      <div className="grid grid-cols-5 sm:grid-cols-7 gap-1">
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
