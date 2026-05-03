import clsx from 'clsx'

export default function StickerCard({ label, count, onIncrement, onDecrement }) {
  const owned = count >= 1
  const duplicate = count >= 2

  return (
    <div className="relative aspect-square">
      <button
        onClick={onIncrement}
        title={owned ? `Tengo ${count} — click para agregar` : 'Me falta — click para marcar'}
        className={clsx(
          'w-full h-full rounded-lg border-2 text-xs font-bold transition-all select-none',
          'flex flex-col items-center justify-center',
          !owned && 'border-gray-700 bg-gray-800 text-gray-500 hover:border-gray-500 hover:text-gray-400',
          owned && !duplicate && 'border-green-500 bg-green-950 text-green-300',
          duplicate && 'border-yellow-400 bg-yellow-950 text-yellow-300',
        )}
      >
        <span>{label}</span>
        {duplicate && <span className="text-[10px] font-black">x{count}</span>}
      </button>

      {owned && (
        <button
          onClick={(e) => { e.stopPropagation(); onDecrement() }}
          title="Quitar una"
          className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-gray-700 hover:bg-red-600 text-white text-[10px] flex items-center justify-center leading-none transition-colors z-10 font-bold"
        >
          −
        </button>
      )}
    </div>
  )
}
