import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-red-400 text-lg font-semibold mb-2">Algo salió mal</p>
            <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">{this.state.error.message}</p>
            <button
              onClick={() => { this.setState({ error: null }); window.location.href = '/album' }}
              className="px-5 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg text-sm hover:bg-yellow-300 transition-colors"
            >
              Volver al álbum
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
