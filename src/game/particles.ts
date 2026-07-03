import { Application, Container, Sprite, Texture } from 'pixi.js'

interface Particle {
	sprite: Sprite
	vx: number
	vy: number
	life: number
	maxLife: number
}

const TEX_MAP: Record<string, string> = {
	crumb: '/crumb.png',
	heart: '/heart.png',
	note: '/note.png',
	sweat: '/sweat.png',
}

export class ParticleSystem {
	private app: Application
	private particles: Particle[] = []
	private container = new Container()

	constructor(app: Application) {
		this.app = app
		this.app.stage.addChild(this.container)
	}

	emit(type: string, x: number, y: number, count = 8, flipX = false) {
		const texPath = TEX_MAP[type]
		if (!texPath) return
		const tex = Texture.from(texPath)

		for (let i = 0; i < count; i++) {
			const sprite = new Sprite(tex)
			sprite.anchor.set(0.5)
			const s = 0.5 + Math.random() * 0.5
			sprite.scale.set(flipX ? s : -s, s)
			const dir = flipX ? -1 : 1
			sprite.x = x + dir * 65 + (Math.random() - 0.5) * 40
			sprite.y = y + (Math.random() - 0.5) * 20
			sprite.alpha = 1

			this.container.addChild(sprite)

			this.particles.push({
				sprite,
				vx: dir * (4 + (Math.random() * 4)),
				vy: 0,
				life: 30 + Math.random() * 30,
				maxLife: 30 + Math.random() * 30,
			})
		}
	}

	update(dt: number) {
		for (let i = this.particles.length - 1; i >= 0; i--) {
			const p = this.particles[i]
			p.vy += 0.1 * dt
			p.sprite.x += p.vx * dt
			p.sprite.y += p.vy * dt
			p.life -= dt
			p.sprite.alpha = Math.max(0, p.life / p.maxLife)

			if (p.life <= 0) {
				this.container.removeChild(p.sprite)
				p.sprite.destroy()
				this.particles.splice(i, 1)
			}
		}
	}
}
