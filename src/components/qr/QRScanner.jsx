import { useEffect, useRef, useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { useNavigate } from 'react-router-dom'

export default function QRScanner() {
  const scannerRef = useRef(null)
  const [error, setError] = useState(null)
  const [scanning, setScanning] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const scanner = new Html5Qrcode('qr-reader')
    scannerRef.current = scanner

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          try {
            const url = new URL(decodedText)
            const matchId = url.pathname.split('/match/')[1]
            if (matchId) {
              scanner.stop().then(() => navigate(`/match/${matchId}`))
            } else {
              setError('QR no válido para Figuritas 2026')
            }
          } catch {
            setError('QR no válido')
          }
        },
        () => {}
      )
      .then(() => setScanning(true))
      .catch((err) => setError(err.message))

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [navigate])

  return (
    <div className="flex flex-col items-center gap-4">
      <div id="qr-reader" className="w-full max-w-sm rounded-xl overflow-hidden" />
      {!scanning && !error && (
        <p className="text-gray-400 text-sm">Iniciando cámara...</p>
      )}
      {error && (
        <div className="bg-red-950 border border-red-800 text-red-300 text-sm px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      <p className="text-gray-400 text-sm text-center max-w-xs">
        Apuntá la cámara al QR de otro usuario para ver qué pueden intercambiar.
      </p>
    </div>
  )
}
