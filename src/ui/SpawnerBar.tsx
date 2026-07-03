import { useState } from 'react'
import { ITEM_CONFIGS } from '../game/types'
import { getTodaysSpecialSlots } from '../game/specialDates'
import { playTick } from '../game/audio'
import type { Game } from '../game/Game'
import styles from './SpawnerBar.module.css'

interface SpawnerBarProps {
  game: Game | null
}

export function SpawnerBar({ game }: SpawnerBarProps) {
  const [deleteActive, setDeleteActive] = useState(false)
  const specialSlots = getTodaysSpecialSlots()
  const specialIds = new Set(specialSlots.map((s) => s.itemId))

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
      {specialSlots.map((slot) => {
        const cfg = ITEM_CONFIGS.find((c) => c.id === slot.itemId)
        if (!cfg) return null
        return (
          <button
            key={slot.itemId}
            className={`${styles.slot} ${styles.specialSlot}`}
            onClick={() => handleSpawn(slot.itemId)}
            onMouseEnter={playTick}
            title={cfg.label}
          >
            <img src={cfg.sprite} alt={cfg.label} />
          </button>
        )
      })}
      {ITEM_CONFIGS.filter((item) => !specialIds.has(item.id)).map((item) => (
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
