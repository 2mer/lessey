import { Application, Container, Sprite, Texture } from 'pixi.js'
import { type ItemCategory, type ItemConfig } from './types'
import { playThud } from './audio'

const FILE_MAP: Record<string, string> = {
  chocolate: '/chocolate.png',
  apple: '/apple.png',
  cat: '/vasya.png',
  rabbit: '/zayatz.png',
  guitar: '/guitar.png',
}

export class Item {
  container = new Container()
  private sprite: Sprite
  private app: Application
  isDragged = false
  private dragOffset = { x: 0, y: 0 }

  private velocity = 0
  private gravity = 0.5
  private onFloor = false
  private landingSquash = 0
  private floorY: number
  private restY = 0

  category: ItemCategory
  consumed: boolean
  id: string
  label: string

  private deleteModeActive = false
  onDelete: (() => void) | null = null
  private boundPointerMove: (e: any) => void = () => {}

  constructor(app: Application, cfg: ItemConfig, x: number, y: number) {
    this.app = app
    this.category = cfg.category
    this.consumed = cfg.consumed
    this.id = cfg.id
    this.label = cfg.label

    this.floorY = app.screen.height - 135

    const texPath = FILE_MAP[this.id] ?? ''
    this.sprite = new Sprite(Texture.from(texPath))
    this.sprite.anchor.set(0.5)
    this.sprite.scale.set(0.5)
    this.container.addChild(this.sprite)

    this.restY = this.floorY - this.sprite.height / 2

    this.container.eventMode = 'static'
    this.container.cursor = 'grab'
    this.container.x = x
    this.container.y = y

    this.setupDrag()
  }

  private setupDrag() {
    this.container.on('pointerdown', (e) => {
      if (this.deleteModeActive) {
        this.onDelete?.()
        return
      }
      this.isDragged = true
      this.container.cursor = 'grabbing'
      const pos = e.global
      this.dragOffset.x = this.container.x - pos.x
      this.dragOffset.y = this.container.y - pos.y
      this.velocity = 0
      this.onFloor = false
    })

    this.boundPointerMove = (e: any) => {
      if (!this.isDragged) return
      const pos = e.global
      this.container.x = pos.x + this.dragOffset.x
      this.container.y = pos.y + this.dragOffset.y
    }
    this.app.stage.on('pointermove', this.boundPointerMove)
  }

  onPointerUp() {
    if (!this.isDragged) return
    this.isDragged = false
    this.container.cursor = 'grab'
  }

  update(dt: number) {
    if (this.isDragged) return

    if (!this.onFloor) {
      this.velocity += this.gravity * dt
      this.container.y += this.velocity * dt

      if (this.container.y >= this.restY) {
        this.container.y = this.restY
        this.onFloor = true
        this.landingSquash = 1
        this.velocity = 0
        playThud()
      }
    }

    if (this.landingSquash > 0) {
      this.landingSquash -= 0.05 * dt
      const s = this.landingSquash
      this.container.scale.x = 1 + s * 0.3
      this.container.scale.y = 1 - s * 0.3
      if (this.landingSquash <= 0) {
        this.landingSquash = 0
        this.container.scale.x = 1
        this.container.scale.y = 1
      }
    }
  }

  setDeleteMode(active: boolean) {
    this.deleteModeActive = active
    if (active) {
      this.container.cursor = 'pointer'
      this.sprite.tint = 0xff6666
    } else {
      this.container.cursor = 'grab'
      this.sprite.tint = 0xffffff
    }
  }

  destroy() {
    this.app.stage.off('pointermove', this.boundPointerMove)
    this.container.removeAllListeners()
  }
}
