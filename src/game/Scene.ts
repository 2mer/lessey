import { Application, Container, Sprite, Texture } from 'pixi.js'

export class Scene {
  container = new Container()
  floorY = 0
  private bg: Sprite
  private app: Application

  constructor(app: Application) {
    this.app = app
    this.app.stage.addChild(this.container)

    this.bg = new Sprite(Texture.from('/background.png'))
    this.bg.anchor.set(0.5)
    this.container.addChild(this.bg)

    this.resize()
  }

  private resize() {
    const { width, height } = this.app.screen

    this.bg.x = width / 2
    this.bg.y = height / 2

    const scale = Math.min(
      width / this.bg.texture.width,
      height / this.bg.texture.height,
    )
    this.bg.scale.set(scale * 0.6)

    this.floorY = height
  }

  update(_dt: number) {}

  onResize() {
    this.resize()
  }
}
