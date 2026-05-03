import QRDisplay from '../components/qr/QRDisplay'

export default function MyQR() {
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-2 text-center">Mi QR</h1>
      <p className="text-gray-400 text-sm text-center mb-8">
        Compartí este código con otros coleccionistas para hacer intercambios.
      </p>
      <QRDisplay />
    </div>
  )
}
