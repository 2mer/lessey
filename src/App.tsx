import { useRef, useEffect, useState } from 'react'
import { Game } from './game/Game'
import { SpawnerBar } from './ui/SpawnerBar'
import { Toast } from './ui/Toast'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Game | null>(null)
  const [game, setGame] = useState<Game | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return
    const g = new Game(containerRef.current)
    g.onMessage = (msg) => setMessage(msg)
    g.init().then(() => {
      gameRef.current = g
      setGame(g)
    })
    return () => {
      g.destroy()
      gameRef.current = null
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <SpawnerBar game={game} />
      <Toast message={message} onDismiss={() => setMessage(null)} />
    </div>
  )
}

export default App
