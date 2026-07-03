import { useState } from 'react'
import { ITEM_CONFIGS } from '../game/types'
import { playTick } from '../game/audio'
import type { Game } from '../game/Game'
import styles from './SpawnerBar.module.css'

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
    <div className={styles.bar}>
      {ITEM_CONFIGS.map((item) => (
        <button
          key={item.id}
          className={styles.slot}
          onClick={() => handleSpawn(item.id)}
          onMouseEnter={playTick}
          title={item.label}
        >
          <img src={item.sprite} alt={item.label} />
        </button>
      ))}
      <button
        className={`${styles.slot} ${styles.trashSlot}${deleteActive ? ` ${styles.trashOn}` : ''}`}
        onClick={handleToggleDelete}
        onMouseEnter={playTick}
        title={deleteActive ? 'Exit delete mode' : 'Delete mode'}
      >
        <img src="/trash.png" alt="Trash" />
      </button>
    </div>
  )
}
