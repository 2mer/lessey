import { Application, Assets } from 'pixi.js'
import { Scene } from './Scene'
import { Lessey } from './Lessey'
import { Item } from './Item'
import { ParticleSystem } from './particles'
import { ITEM_CONFIGS } from './types'
import { playMunch, playChew, playKiss, playGuitar } from './audio'

const TEXTURES = [
	'/background.png',
	'/lessey.png', '/lessey_eat.png', '/lessey_kiss.png',
	'/apple.png', '/chocolate.png', '/guitar.png', '/vasya.png', '/zayatz.png',
	'/crumb.png', '/heart.png', '/note.png', '/sweat.png',
]

export class Game {
	app: Application
	scene: Scene
	lessey: Lessey
	items: Item[] = []
	particles: ParticleSystem
	container: HTMLElement
	private deleteMode = false
	private mouseX = 0
	private mouseY = 0
	private sweatTimer = 0

	constructor(container: HTMLElement) {
		this.container = container
		this.app = {} as Application
		this.scene = {} as Scene
		this.lessey = {} as Lessey
		this.particles = {} as ParticleSystem
	}

	async init() {
		this.app = new Application()
		await this.app.init({
			resizeTo: this.container,
			background: '#d4b89e',
			antialias: false,
		})
		this.container.appendChild(this.app.canvas)

		await Assets.load(TEXTURES)

		this.scene = new Scene(this.app)
		this.lessey = new Lessey(this.app)
		this.particles = new ParticleSystem(this.app)

		this.app.ticker.add(() => this.update())
		this.setupGlobalPointer()
	}

	private setupGlobalPointer() {
		this.app.stage.eventMode = 'static'
		this.app.stage.on('globalpointermove', (e) => {
			this.mouseX = e.global.x
			this.mouseY = e.global.y
		})
		this.app.stage.on('pointerup', () => {
			for (const item of this.items) item.onPointerUp()
		})
		this.app.stage.on('pointerupoutside', () => {
			for (const item of this.items) item.onPointerUp()
		})
	}

	private _alternate = false;

	private update() {
		const dt = this.app.ticker.deltaTime
		this.scene.update(dt)
		this.lessey.update(dt)

		if (this.lessey.isDragged) {
			this.sweatTimer -= dt
			if (this.sweatTimer <= 0) {
				const side = this.lessey.container.rotation >= 0 ? 1 : -1
				this.particles.emit('sweat',
					this.lessey.container.x + side * 25,
					this.lessey.container.y - 35,
					1,
					this._alternate = !this._alternate,
				)
				this.sweatTimer = 10
			}
		} else {
			this.sweatTimer = 0
		}

		for (const item of this.items) {
			item.update(dt)
			this.checkProximity(item, dt)
		}

		this.particles.update(dt)
	}

	private checkProximity(item: Item, dt: number) {
		if (!item.isDragged) return

		const l = this.lessey.container
		const dx = item.container.x - l.x
		const dy = item.container.y - l.y
		const dist = Math.sqrt(dx * dx + dy * dy)

		if (dist < 80) {
			if (item.consumed) {
				if (item.proximityTimer === 0) {
					this.lessey.triggerReaction(item.category)
				}
				item.proximityTimer += dt
				item.emitCooldown -= dt
				if (item.emitCooldown <= 0) {
					this.particles.emit('crumb', item.container.x, item.container.y, 1)
					playChew()
					this.lessey.squash()
					item.squash()
					item.emitCooldown = 15
				}

				if (item.proximityTimer >= 120) {
					playMunch()
					this.particles.emit('crumb', item.container.x, item.container.y, 12)
					this.removeItem(item)
				}
			} else if (item.category === 'cuddly') {
				item.emitCooldown -= dt
				if (item.emitCooldown <= 0) {
					playKiss()
					this.lessey.triggerReaction(item.category)
					this.lessey.squash()
					this.particles.emit('heart', item.container.x, item.container.y, 3)
					item.emitCooldown = 20
				}
			} else if (item.category === 'instrument') {
				item.emitCooldown -= dt
				if (item.emitCooldown <= 0) {
					playGuitar()
					this.lessey.triggerReaction(item.category)
					this.lessey.squash()
					this.particles.emit('note', item.container.x, item.container.y, 3)
					item.emitCooldown = 20
				}
			}
		} else {
			item.proximityTimer = 0
			item.emitCooldown = 0
		}
	}

	toggleDeleteMode() {
		this.deleteMode = !this.deleteMode
		for (const item of this.items) {
			item.setDeleteMode(this.deleteMode)
		}
		return this.deleteMode
	}

	isDeleteMode(): boolean {
		return this.deleteMode
	}

	spawnItem(itemId: string) {
		if (this.deleteMode) return
		const cfg = ITEM_CONFIGS.find((c) => c.id === itemId)
		if (!cfg) return

		const x = this.mouseX || this.app.screen.width / 2
		const y = this.mouseY || 200

		const item = new Item(this.app, cfg, x, y)
		item.onDelete = () => this.removeItem(item)
		this.items.push(item)
		this.app.stage.addChild(item.container)
	}

	private removeItem(item: Item) {
		this.app.stage.removeChild(item.container)
		const idx = this.items.indexOf(item)
		if (idx !== -1) this.items.splice(idx, 1)
		item.destroy()
	}

	destroy() {
		for (const item of this.items) item.destroy()
		this.lessey.destroy()
		this.app.destroy(true)
	}
}
