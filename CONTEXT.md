# Lessey — Domain Glossary

## Characters

- **Lessey** — the main character, a girl. Reacts to items held near her.

## Items

Items are objects in the scene the player can drag around. Each item belongs to one category:

- **Edible** — food items. Holding near Lessey triggers a *munch* reaction.
- **Cuddly** — animals (cat, rabbit). Holding near Lessey triggers a *kiss* reaction.
- **Instrument** — musical items (guitar). Holding near Lessey triggers a *play* reaction.
- **Inert** — items with no special interaction. Lessey ignores them.

### MVP items

| Item | Category | Consumed on use? |
|------|----------|-----------------|
| Chocolate bar | Edible | Yes |
| Apple | Edible | Yes |
| Cat | Cuddly | No |
| Rabbit | Cuddly | No |
| Guitar | Instrument | No |

## Persistence

No persistence. Scene resets completely on page refresh.

## Spawner UI

A palette of buttons for spawning items and a trashcan button. Items spawn at the cursor position, immediately grabbable. Multiple copies of the same item can exist simultaneously.

- Click an item button → spawns it at cursor position
- Click trashcan → enter delete mode; click an item in the scene to remove it

## UI

The spawner toolbar is an overlay at the bottom of the canvas. Buttons for each item (chocolate bar, apple, cat, rabbit, guitar) and a trashcan button at the right edge.

## Audio

Simple SFX (no background music):
- Munch sound (chomp/bite)
- Kiss sound (smooch)
- Guitar strum
- Soft thud when an item hits the floor

## Scene

A single room with a background wall and a floor plane. No scrolling or camera movement. Items fall straight down when released (gravity) and stop at the floor with a squash tween.

## Lessey

Lessey wanders the room autonomously (random wandering within bounds). She can also be grabbed and dragged by the player — while held she swings from side to side (pendulum tween).

## Proximity reactions

A held item entering Lessey's vicinity (a radius around her) triggers her reaction immediately. The reaction plays to completion even if the item is pulled away:
- **Edible**: Lessey plays munch animation + particles. The item is consumed (vanishes) at the start.
- **Cuddly**: Lessey plays kiss animation. Item stays.
- **Instrument**: Lessey plays instrument animation. Item stays.
- **Inert**: No reaction.

## Sprite scope (MVP)

### Lessey sprite states
- Idle (standing — animated via squash/stretch tween, no sprite frames)
- Munch (sprite animation)
- Kiss (sprite animation)
- Play (instrument) (sprite animation)

Lessey has **no walk animation frames**. When she moves, she glides with a squash/stretch tween.

The idle tween alternates between two squash modes on a loop:
1. Squish X, stretch Y
2. Squish Y, stretch X

### Environment
- Background wall
- Floor

### Items
One sprite per MVP item (chocolate bar, apple, cat, rabbit, guitar).
