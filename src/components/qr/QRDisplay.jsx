import QRCode from 'react-qr-code'
import { useAuth } from '../../contexts/AuthContext'

export default function QRDisplay() {
  const { user } = useAuth()
  const profileUrl = `${window.location.origin}/match/${user?.id}`

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white p-4 rounded-xl">
        <QRCode value={profileUrl} size={200} />
      </div>
      <p className="text-gray-400 text-sm text-center max-w-xs">
        Mostrá este QR a otro usuario para que escanee tu perfil y vean qué figuritas pueden intercambiar.
      </p>
      <p className="text-xs text-gray-600 break-all">{profileUrl}</p>
    </div>
  )
}
