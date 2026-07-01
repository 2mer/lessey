import { useRef, useEffect, useState } from 'react'
import { Game } from './game/Game'
import { SpawnerBar } from './ui/SpawnerBar'

function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Game | null>(null)
  const [game, setGame] = useState<Game | null>(null)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return
    const g = new Game(containerRef.current)
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
    </div>
  )
}

export default App
