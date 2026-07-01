# Lessey — MVP Scope

## Infrastructure

- [x] Project setup (Vite + React + TypeScript + Pixi.js)
- [x] Canvas rendering (Pixi.js Application, fills viewport)
- [x] Overlay UI layer (spawner toolbar, React-managed)

## Scene

- [x] Background wall sprite (placeholder Graphics rect)
- [x] Floor sprite (placeholder Graphics rect)
- [x] Items fall straight down with gravity when released
- [x] Squash tween on item landing

## Spawner UI

- [x] Spawner toolbar overlay at bottom of canvas
- [x] Chocolate bar button → spawns at cursor
- [x] Apple button → spawns at cursor
- [x] Cat button → spawns at cursor
- [x] Rabbit button → spawns at cursor
- [x] Guitar button → spawns at cursor
- [x] Trashcan button → toggle delete mode, click item to remove
- [x] Unlimited copies of any item

## Drag-and-drop

- [x] Mouse down on item → pick up (item follows cursor)
- [x] Mouse move while held → item follows cursor
- [x] Mouse release → item drops with gravity
- [x] Item held at cursor offset (not centered on cursor)
- [x] Visual feedback (cursor change) while dragging

## Lessey

- [x] Idle animation (squash/stretch tween, alternates X/Y squash)
- [x] Autonomous wandering (random direction changes, stays in bounds)
- [x] Draggable by mouse (click-and-hold on Lessey)
- [x] Pendulum swing while Lessey is dragged
- [x] Glide movement (no walk frames, squash/stretch tween during movement)

## Proximity reactions

- [x] Proximity zone around Lessey (radius)
- [x] Held item enters zone → reaction triggers immediately
- [x] Reaction plays to completion even if item is pulled away

### Munch (edible items)

- [x] Munch reaction (duration ~2 seconds via state timer)
- [x] Munch sound effect
- [x] Food particles (crumbs/sparkles) on consumption
- [x] Edible item vanishes at reaction start

### Kiss (cuddly items)

- [x] Kiss reaction (~1 second)
- [x] Kiss sound effect
- [x] Item stays in scene

### Play (instruments)

- [x] Play reaction (~1 second)
- [x] Guitar strum sound effect
- [x] Item stays in scene

## Audio

- [x] Munch SFX (synthesized)
- [x] Kiss SFX (synthesized)
- [x] Guitar strum SFX (synthesized)
- [x] Floor thud SFX (synthesized)

## Sprites — wired up

### Lessey
- [x] Idle sprite (`lessey.png`)
- [x] Munch sprite (`lessey_eat.png`)
- [x] Kiss sprite (`lessey_kiss.png`)
- [x] Play sprite (reuses `lessey_eat.png`)

### Items
- [x] Chocolate bar (`chocolate.png`)
- [x] Apple (`apple.png`)
- [x] Cat (`vasya.png`)
- [x] Rabbit (`zayatz.png`)
- [x] Guitar (`guitar.png`)

### Environment
- [x] Background wall (`background.png`, tiled)
- [x] Floor (`floor.png`, tiled at bottom)

### Particles
- [x] Food crumb (`crumb.png`)
- [x] Heart (`heart.png`)

## Out of scope (MVP)

- Walk animation frames (Lessey glides with tween)
- Camera / scrolling
- Multi-room / outdoor scenes
- State persistence (localStorage, saves)
- Background music
- Collision between items (no stacking)
- Item-to-item interactions
- Inventory system
- Lessey autonomy (hunger, mood, stats)
