import { Application, Container, Sprite, Texture } from 'pixi.js'
import { type ItemCategory } from './types'
import { playThud } from './audio'
import { img } from '../util'

type LesseyState = 'idle' | 'munch' | 'kiss' | 'play'

const TEXTURE_IDLE = img`/lessey.png`
const TEXTURE_EAT = img`/lessey_eat.png`
const TEXTURE_KISS = img`/lessey_kiss.png`

export class Lessey {
	container = new Container()
	private sprite: Sprite
	private app: Application
	reacting = false
	isDragged = false

	private state: LesseyState = 'idle'
	private stateTimer = 0
	private idleTime = 0
	private wanderDir = 0
	private wanderTimer = 0
	private squashPhase = 0

	private dragOffset = { x: 0, y: 0 }
	private swingAngle = 0
	private swingSpeed = 0.08
	private boundPointerMove: (e: any) => void = () => { }
	private boundPointerUp: () => void = () => { }
	private boundPointerUpOutside: () => void = () => { }

	private velocityY = 0
	private gravity = 0.5
	private onFloor = false
	private standY = 0
	private landingSquash = 0
	private chewSquash = 0

	constructor(app: Application) {
		this.app = app

		this.sprite = new Sprite(Texture.from(TEXTURE_IDLE))
		this.sprite.anchor.set(0.5)
		this.sprite.scale.set(0.7)
		this.container.addChild(this.sprite)

		this.container.eventMode = 'static'
		this.container.cursor = 'grab'
		app.stage.addChild(this.container)

		const floorTop = app.screen.height - 135
		const spriteH = this.sprite.height
		this.standY = floorTop - spriteH / 2
		this.container.x = app.screen.width / 2
		this.container.y = this.standY
		this.onFloor = true

		this.setupDrag()
		this.pickWanderDir()
	}

	private setupDrag() {
		this.container.on('pointerdown', (e) => {
			this.isDragged = true
			this.container.cursor = 'grabbing'
			const pos = e.global
			this.dragOffset.x = this.container.x - pos.x
			this.dragOffset.y = this.container.y - pos.y
			this.wanderDir = 0
			this.onFloor = false
			this.landingSquash = 0
			this.container.scale.x = 1
			this.container.scale.y = 1
		})

		this.boundPointerMove = (e: any) => {
			if (!this.isDragged) return
			const pos = e.global
			this.container.x = pos.x + this.dragOffset.x
			this.container.y = pos.y + this.dragOffset.y
			this.onFloor = false
		}
		this.app.stage.on('pointermove', this.boundPointerMove)

		this.boundPointerUp = () => {
			if (!this.isDragged) return
			this.isDragged = false
			this.container.cursor = 'grab'
			this.container.rotation = 0
			this.pickWanderDir()
		}
		this.app.stage.on('pointerup', this.boundPointerUp)

		this.boundPointerUpOutside = () => {
			if (!this.isDragged) return
			this.isDragged = false
			this.container.cursor = 'grab'
			this.container.rotation = 0
			this.pickWanderDir()
		}
		this.app.stage.on('pointerupoutside', this.boundPointerUpOutside)
	}

	private pickWanderDir() {
		this.wanderDir = (Math.random() - 0.5) * 2
		this.wanderTimer = 60 + Math.random() * 120
	}

	update(dt: number) {
		if (this.reacting) {
			this.stateTimer -= dt
			if (this.stateTimer <= 0) {
				this.reacting = false
				this.state = 'idle'
				this.sprite.texture = Texture.from(TEXTURE_IDLE)
			}
		}

		this.idleTime += dt * 0.08
		this.squashPhase = Math.sin(this.idleTime) * 0.04

		if (this.isDragged) {
			this.swingAngle += this.swingSpeed
			this.container.rotation = Math.sin(this.swingAngle) * 0.2
		}

		if (!this.isDragged) {
			if (!this.onFloor) {
				this.velocityY += this.gravity * dt
				this.container.y += this.velocityY * dt
				if (this.container.y >= this.standY) {
					this.container.y = this.standY
					this.onFloor = true
					this.velocityY = 0
					this.landingSquash = 1
					playThud()
				}
			}

			if (this.landingSquash > 0) {
				this.landingSquash -= 0.05 * dt
				const s = this.landingSquash
				this.container.scale.x = 1 + s * 0.15
				this.container.scale.y = 1 - s * 0.15
				if (this.landingSquash <= 0) {
					this.landingSquash = 0
					this.container.scale.x = 1
					this.container.scale.y = 1
				}
			} else if (this.chewSquash > 0) {
				this.chewSquash -= 0.08 * dt
				const s = this.chewSquash
				this.container.scale.x = 1 + s * 0.12
				this.container.scale.y = 1 - s * 0.12
				if (this.chewSquash <= 0) {
					this.chewSquash = 0
					this.container.scale.x = 1
					this.container.scale.y = 1
				}
			} else if (this.state === 'idle') {
				this.container.scale.x = 1 + this.squashPhase
				this.container.scale.y = 1 - this.squashPhase
			}

			if (this.onFloor && !this.reacting) {
				this.wanderTimer -= dt
				if (this.wanderTimer <= 0) this.pickWanderDir()

				this.container.x += this.wanderDir * 1.5

				const margin = 80
				if (this.container.x < margin) { this.container.x = margin; this.wanderDir *= -1 }
				if (this.container.x > this.app.screen.width - margin) { this.container.x = this.app.screen.width - margin; this.wanderDir *= -1 }
			}
		}
	}

	destroy() {
		this.app.stage.off('pointermove', this.boundPointerMove)
		this.app.stage.off('pointerup', this.boundPointerUp)
		this.app.stage.off('pointerupoutside', this.boundPointerUpOutside)
		this.container.removeAllListeners()
	}

	triggerReaction(category: ItemCategory) {
		const reactionMap: Record<ItemCategory, LesseyState> = {
			edible: 'munch',
			cuddly: 'kiss',
			instrument: 'play',
			inert: 'idle',
		}
		this.state = reactionMap[category]
		this.reacting = true
		this.stateTimer = this.state === 'munch' ? 120 : 60

		if (this.state === 'munch') {
			this.sprite.texture = Texture.from(TEXTURE_EAT)
		} else if (this.state === 'kiss') {
			this.sprite.texture = Texture.from(TEXTURE_KISS)
		} else if (this.state === 'play') {
			this.sprite.texture = Texture.from(TEXTURE_EAT)
		}
	}

	squash() {
		this.chewSquash = 1
	}
}
