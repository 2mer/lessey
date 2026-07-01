import { useState } from 'react'
import { ITEM_CONFIGS } from '../game/types'
import type { Game } from '../game/Game'

interface SpawnerBarProps {
  game: Game | null
}

export function SpawnerBar({ game }: SpawnerBarProps) {
  const [deleteActive, setDeleteActive] = useState(false)

  const handleSpawn = (itemId: string) => {
    game?.spawnItem(itemId)
  }

  const handleToggleDelete = () => {
    if (!game) return
    const active = game.toggleDeleteMode()
    setDeleteActive(active)
  }

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
        padding: '10px 16px',
        background: 'rgba(0,0,0,0.4)',
        pointerEvents: 'auto',
      }}
    >
      {ITEM_CONFIGS.map((item) => (
        <button
          key={item.id}
          onClick={() => handleSpawn(item.id)}
          style={{
            padding: '8px 14px',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            color: '#fff',
            background: '#555',
          }}
        >
          {item.label}
        </button>
      ))}
      <button
        onClick={handleToggleDelete}
        style={{
          padding: '8px 14px',
          border: 'none',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 600,
          color: '#fff',
          background: deleteActive ? '#cc3333' : '#555',
          marginLeft: 8,
        }}
      >
        {deleteActive ? 'Exit' : 'Trash'}
      </button>
    </div>
  )
}
