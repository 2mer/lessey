import { Application, Container, Sprite, Texture } from 'pixi.js'

export class Scene {
  container = new Container()
  floorY = 0
  private bg: Sprite
  private floor: Sprite
  private app: Application

  constructor(app: Application) {
    this.app = app
    this.app.stage.addChild(this.container)

    this.bg = new Sprite(Texture.from('/background.png'))
    this.bg.anchor.set(0, 0)
    this.container.addChild(this.bg)

    this.floor = new Sprite(Texture.from('/floor.png'))
    this.floor.anchor.set(0, 0)
    this.container.addChild(this.floor)

    this.resize()
  }

  private resize() {
    const { width, height } = this.app.screen
    const floorH = 135

    this.bg.width = width
    this.bg.height = height - floorH
    this.bg.x = 0
    this.bg.y = 0

    this.floor.width = width
    this.floor.height = floorH
    this.floor.x = 0
    this.floor.y = height - floorH

    this.floorY = height - floorH
  }

  update(_dt: number) {}

  onResize() {
    this.resize()
  }
}
