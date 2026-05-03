import clsx from 'clsx'

export default function StickerCard({ stickerId, label, count, onToggle }) {
  const owned = count >= 1
  const duplicate = count >= 2

  return (
    <button
      onClick={onToggle}
      title={duplicate ? `${count} repetidas` : owned ? 'Tengo 1' : 'Me falta'}
      className={clsx(
        'relative aspect-square rounded-lg border-2 text-xs font-bold transition-all select-none',
        'flex flex-col items-center justify-center gap-0.5',
        !owned && 'border-gray-700 bg-gray-800 text-gray-500 hover:border-gray-600',
        owned && !duplicate && 'border-green-500 bg-green-950 text-green-300',
        duplicate && 'border-yellow-400 bg-yellow-950 text-yellow-300',
      )}
    >
      <span>{label}</span>
      {duplicate && (
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </button>
  )
}
