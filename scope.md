# Lessey — MVP Scope

## Infrastructure

- [ ] Project setup (Vite + React + TypeScript + Pixi.js)
- [ ] Canvas rendering (Pixi.js Application, fills viewport)
- [ ] Overlay UI layer (spawner toolbar, React-managed)

## Scene

- [ ] Background wall sprite
- [ ] Floor sprite (defines floor Y plane)
- [ ] Items fall straight down with gravity when released
- [ ] Squash tween on item landing

## Spawner UI

- [ ] Spawner toolbar overlay at bottom of canvas
- [ ] Chocolate bar button → spawns at cursor
- [ ] Apple button → spawns at cursor
- [ ] Cat button → spawns at cursor
- [ ] Rabbit button → spawns at cursor
- [ ] Guitar button → spawns at cursor
- [ ] Trashcan button → click to enter delete mode, click item to remove
- [ ] Unlimited copies of any item

## Drag-and-drop

- [ ] Mouse down on item → pick up (item follows cursor)
- [ ] Mouse move while held → item follows cursor
- [ ] Mouse release → item drops with gravity
- [ ] Item held at cursor offset (not centered on cursor)
- [ ] Visual feedback (cursor change / item lift) while dragging

## Lessey

- [ ] Idle animation (squash/stretch tween, alternates X/Y squash)
- [ ] Autonomous wandering (random direction changes, stays in bounds)
- [ ] Draggable by mouse (click-and-hold on Lessey)
- [ ] Pendulum swing while Lessey is dragged
- [ ] Glide movement (no walk frames, squash/stretch tween during movement)

## Proximity reactions

- [ ] Proximity zone around Lessey (radius)
- [ ] Held item enters zone → reaction triggers immediately
- [ ] Reaction plays to completion even if item is pulled away

### Munch (edible items)

- [ ] Munch sprite animation (~2-3 seconds)
- [ ] Munch sound effect
- [ ] Food particles (crumbs/sparkles) during munch
- [ ] Edible item vanishes at reaction start

### Kiss (cuddly items)

- [ ] Kiss sprite animation (~1-2 seconds)
- [ ] Kiss sound effect
- [ ] Item stays in scene

### Play (instruments)

- [ ] Play sprite animation (~1-2 seconds)
- [ ] Guitar strum sound effect
- [ ] Item stays in scene

## Audio

- [ ] Munch SFX
- [ ] Kiss SFX
- [ ] Guitar strum SFX
- [ ] Floor thud SFX

## Sprites needed

### Lessey
- [ ] Idle sprite sheet (single frame, tweened via Pixi)
- [ ] Munch sprite sheet
- [ ] Kiss sprite sheet
- [ ] Play sprite sheet

### Items
- [ ] Chocolate bar
- [ ] Apple
- [ ] Cat
- [ ] Rabbit
- [ ] Guitar

### Environment
- [ ] Background wall
- [ ] Floor

### Particles
- [ ] Food particle (crumb/sparkle)

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
