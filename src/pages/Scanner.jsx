import QRScanner from '../components/qr/QRScanner'

export default function Scanner() {
  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-2 text-center">Escanear QR</h1>
      <p className="text-gray-400 text-sm text-center mb-8">
        Escaneá el QR de otro usuario para ver qué figuritas pueden intercambiar.
      </p>
      <QRScanner />
    </div>
  )
}
