import { img } from "../util"

export type ItemCategory = 'edible' | 'cuddly' | 'instrument' | 'inert'

export interface ItemConfig {
	id: string
	label: string
	sprite: string
	category: ItemCategory
	consumed: boolean
}

export const ITEM_CONFIGS: ItemConfig[] = [
	{ id: 'chocolate', label: 'Chocolate', sprite: img`/chocolate.png`, category: 'edible', consumed: true },
	{ id: 'apple', label: 'Apple', sprite: img`/apple.png`, category: 'edible', consumed: true },
	{ id: 'cat', label: 'Cat', sprite: img`/vasya.png`, category: 'cuddly', consumed: false },
	{ id: 'rabbit', label: 'Rabbit', sprite: img`/zayatz.png`, category: 'cuddly', consumed: false },
	{ id: 'guitar', label: 'Guitar', sprite: img`/guitar.png`, category: 'instrument', consumed: false },
	{ id: 'cake', label: 'Cake', sprite: img`/cake.png`, category: 'edible', consumed: true },
]
